import { useState, useContext, useLayoutEffect } from 'react'
import Icon from '../../../components/icon'

import MessageDisplay from './messageDisplay'

import { Sidenav } from '..'

import avatar from '../../../assets/avatar.jpg'
import searchImg from '../../../components/assets/search.png'


import UserContext, { UserCon, user_info } from '../../../context/UserContext'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../main'




export default function Messages() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)
  const [messages, setMessages] = useState<string[]>()
  const context = useContext(UserCon)

  if (!context?.user?.details) {

    return null
  }
  useLayoutEffect(() => {
    let unsub:any
    const fetchMessages = async () => {
      if (context.user?.details) {
        const docRef = doc(db, 'users', context.user.details.id)
        const res = await getDoc(docRef)
        unsub = onSnapshot(docRef, (doc)=>{
          const data = res.data() as user_info|undefined
          if(data){
            setMessages(data.messages)
          }
        })
      }
    }
    fetchMessages()
    if(unsub){
      return unsub
    }
  }, [])

  return (
    <section>
      <header className='p-3 flex gap-4 items-center border-b border-[#fff1]'>
        <Icon
          src={context.user.details.avatar || avatar}
          width='30px'
          height='30px'
          className='rounded-full'
          onClick={() => setSidenav(!sidenavOpen)} />
        <h2 className='font-[700] text-[18px]'>Messages</h2>
      </header>
      <main className='p-3 w-full'>
        <form onSubmit={() => null} className="relative ml-auto mr-auto w-[100%]">
          <input type="text"
            className='bg-transparent w-[100%] rounded-full h-[40px] pl-9 placeholder-[#fff4] border border-[#fff4]'
            placeholder='Search Direct Messages' />
          <button className='absolute left-3 top-[50%] transform translate-y-[-50%]'><Icon width='15px' height='14px' src={searchImg} className="" /></button>
        </form>
        <section className='mt-6 '>
          {messages&&messages.length ?
            messages.map((item:any) => <MessageDisplay key={item.id} id={item} />) :
            <p className='text-[#fff8]'>You have no open chat...</p>}
        </section>
      </main>
    </section>
  )
}

