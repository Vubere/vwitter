import { useNavigate, useParams } from "react-router-dom"

import ChatBubble from "./ChatBubble"
import Back from "../../components/Back"
import Icon from "../../components/icon"


import avatar from '../../assets/avatar.jpg'
import { useEffect, useRef, useState } from "react"
import { user_details } from "../Dashboard/home/components/PostItem"
import Input from "./Input"

export default function Chat() {
  const { chatId } = useParams()
  const [user, setUser] = useState<user_details>({
    username: 'victor',
    full_name: 'victor ubere',
    id: 'ba',
    avatar: ''
  })
  const navigate = useNavigate()
  const lastMessage = useRef<any>()

  useEffect(()=>{
    if(lastMessage.current){
      lastMessage.current.scrollIntoView()
    }
  },[lastMessage.current])

  const [chat, setChat] = useState<Chat>({
    id: 'as',
    parties: {
      one: {
        username: 'victor',
        full_name: 'victor ubere',
        id: 'ba',
        avatar: ''
      },
      two: {
        username: 'victor',
        full_name: 'victor ubere',
        id: 'ba',
        avatar: ''
      },
    },
    chat: [
      {
        text: 'upgauda',
        time: 1,
        photoUrl: '',
        sender: {
          username: 'victor',
          full_name: 'victor ubere',
          id: 'ba',
          avatar: ''
        },
        id: 'aphuhdp'
      },
      {
        text: 'downauda',
        time: 2,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vicr ubere',
          id: 'da',
          avatar: ''
        },
        id: 'apuvhdp'
      },
      {
        text: 'upgauda',
        time: 3,
        photoUrl: '',
        sender: {
          username: 'victor',
          full_name: 'victor ubere',
          id: 'ba',
          avatar: ''
        },
        id: 'apushdp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'da',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'ba',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'da',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'ba',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'da',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'da',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'ba',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'da',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'ba',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'da',
          avatar: ''
        },
        id: 'apuhadp'
      },
      {
        text: 'downauda',
        time: 4,
        photoUrl: '',
        sender: {
          username: 'vhak',
          full_name: 'vior ubre',
          id: 'da',
          avatar: ''
        },
        id: 'apuhadp'
      },
    ]
  })

  return (
    <div className="w-full max-h-[100vh] relative">
      <header className="p-3 w-full h-[50px] flex items-center bg-[#000e] fixed top-0 ">
        <Back click={() => navigate(-1)}
          className='w-[30px] h-[20px]' />
        <div className="ml-5 flex items-center gap-3">
          <Icon src={avatar} width='30px' height='30px' className="rounded-full border border-[#fff3]" />
          <p className="font-[600]">victor ubere</p>
        </div>
      </header>
      <main className="pt-[50px] w-full overflow-auto mb-[50px] pb-[55px]" >
        {chat.chat.sort((a, b) => a.time - b.time).map((item, i) => (<ChatBubble details={item}
          ref={i == chat.chat.length - 1 ? lastMessage : undefined}
          className={item.sender.id != user.id ? 'left' : 'right'} />

        ))}
      </main>
      <Input />
    </div>
  )
}

export type Chat = {
  id: string,
  chat: singleChat[]
  parties: {
    one: user_details,
    two: user_details
  }
}

export type singleChat = {
  text: string,
  time: number,
  photoUrl: string,
  sender: {
    username: string,
    full_name: string,
    id: string,
    avatar: string
  },
  id: string
}