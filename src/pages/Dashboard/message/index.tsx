import { useState, useContext } from 'react'
import Icon from '../../../components/icon'

import MessageDisplay from './messageDisplay'

import { Sidenav } from '..'

import avatar from '../../../assets/avatar.jpg'
import searchImg from '../../../components/assets/search.png'

import { user_details } from '../home/components/PostItem'


export default function Messages() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)
  const [messages, setMessages] = useState<message[] | undefined>([
    {
    user_details:{
      full_name: 'Victor Ubere',
      username: "vubere",
      avatar: '',
      id: ''
    },
    date: 'Dec 29',
    text: 'what"s up',
    photo_url: '',
    id: 'dd'
  },
    {
    user_details:{
      full_name: 'Victor Ubere',
      username: "vubere",
      avatar: '',
      id: ''
    },
    date: 'Dec 29',
    text: 'what"s up',
    photo_url: '',
    id:'gg'
  },
]
  )

  return (
    <section>
      <header className='p-3 flex gap-4 items-center border-b border-[#fff1]'>
        <Icon
          src={avatar}
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
          placeholder='Search Direct Messages'/>
          <button className='absolute left-3 top-[50%] transform translate-y-[-50%]'><Icon width='15px' height='14px' src={searchImg} className="" /></button>
        </form>
        <section className='mt-6 '>
          {messages ?
            messages.map((item) => <MessageDisplay key={item.id} item={item}/>) :
            <p className='text-[#fff8]'>You have no open chat...</p>}
        </section>
      </main>
    </section>
  )
}


export type message = {
  user_details: user_details,
  text: string,
  photo_url: string,
  date: string,
  id: string
}