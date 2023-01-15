import { useState, useContext, useLayoutEffect, useEffect } from 'react'
import Icon from '../../../components/icon'

import MessageDisplay from './messageDisplay'

import { Sidenav } from '..'

import avatar from '../../../assets/avatar.jpg'
import searchImg from '../../../components/assets/search.png'


import { UserCon, user_info } from '../../../context/UserContext'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../main'
import { useNavigate } from 'react-router-dom'
import Load from '../../../components/load'




export default function Messages() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)
  const [messages, setMessages] = useState<string[]>()
  const context = useContext(UserCon)
  
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    if (context?.user?.details) {
      let unsub: any

      const fetchMessages = async () => {
        setLoading(true)
        if (context.user?.details) {
          const docRef = doc(db, 'users', context.user.details.id)
          const res = await getDoc(docRef)
          unsub = onSnapshot(docRef, (doc) => {
            const data = res.data() as user_info | undefined
            if (data) {
              const h = new Set(data.messages)
              const ar = Array.from(h)
              setMessages(ar)
            }
          })
          setLoading(false)
        }
      }
      fetchMessages()
      if (unsub) {
        return unsub
      }
    }
  }, [])
  useEffect(() => {
    (async () => {
      if (context?.user) {

        const userRef = doc(db, 'users', context.user?.details.id)
        await updateDoc(userRef, {
          unread_messages: 0
        })
      }
    })()
  }, [])
  if(!context?.user?.details){
    return null
  }
  if (loading) {
    return <Load />
  }

  return (
    <section>
      <header className='p-3 flex gap-4 items-center border-b border-[#fff1] fixed w-full top-0 bg-black'>
        <Icon
          src={context.user.details.avatar || avatar}
          width='30px'
          height='30px'
          className='rounded-full'
          onClick={() => setSidenav(!sidenavOpen)} />
        <h2 className='font-[700] text-[18px]'>Messages</h2>
      </header>
      <main className='p-3 w-full mt-12'>
        <form onSubmit={() => null} className="relative ml-auto mr-auto w-[100%]">
          <input type="text"
            className='bg-transparent w-[100%] rounded-full h-[40px] pl-9 placeholder-[#fff4] border border-[#fff4]'
            placeholder='Search Direct Messages' />
          <button className='absolute left-3 top-[50%] transform translate-y-[-50%]'><Icon width='15px' height='14px' src={searchImg} className="" /></button>
        </form>
        <section className='mt-6 pb-12'>
          {messages && messages.length ?
            messages.reverse().map((item: any) => <MessageDisplay key={item.id} id={item} />) :
            <p className='text-[#fff8]'>You have no open chat...</p>}
        </section>
        
      </main>
    </section>
  )
}

