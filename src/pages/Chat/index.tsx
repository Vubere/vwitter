import { useNavigate, useParams } from "react-router-dom"

import ChatBubble from "./ChatBubble"
import Back from "../../components/Back"
import Icon from "../../components/icon"


import avatar from '../../assets/avatar.jpg'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"

import Input from "./Input"
import { UserCon } from "../../context/UserContext"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "../../main"
import getUserByUsername from "../../services/getUserByUsername"
import Load from "../../components/load"


export default function Chat() {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const lastMessage = useRef<any>()
  const [loading, setLoading] = useState(false)

  const userContext = useContext(UserCon)

  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView()
    }
  }, [lastMessage.current])

  const [party, setParty] = useState<user_basic_info>()

  const [chat, setChat] = useState<Chat>()
  if (!userContext?.user?.details) {
    return <Load />
  }
  const user = userContext.user


  useLayoutEffect(() => {
    if (chatId) {
      let resp
      const fetchChat = async () => {
        setLoading(true)
        const res = await getUserByUsername(chatId)
        if (res) {
          setParty(res.details)
          const id = [user.id, res.id].sort().join('')
          const chatRef = doc(db, 'chats', id)
          resp = onSnapshot(chatRef, (doc) => {
            const chatDetails = doc.data() as Chat | undefined
            if (chatDetails) {
              setChat(chatDetails)
              setLoading(false)
            }
          })
        }
      }
      fetchChat()
      if (resp) {
        return resp
      }
    }
  }, [])
  if (!party) {
    return <Load />
  }

  return (<>
    {
      loading ? (<Load />) : (
        <div className="w-full max-h-[100vh] relative">
          <header className="p-3 w-full h-[50px] flex items-center bg-[#000e] fixed top-0 ">
            <Back click={() => navigate(-1)}
              className='w-[30px] h-[20px]' />
            <div className="ml-5 flex items-center gap-3">
              <Icon src={party.avatar || avatar} width='30px' height='30px' className="rounded-full border border-[#fff3]" />
              <p className="font-[600]">{party.name}</p>
            </div>
          </header>
          <main className="pt-[50px] w-full overflow-auto mb-[50px] pb-[55px]" >
            {chat ? chat.chat.sort((a, b) => a.time - b.time).map((item, i) => (<ChatBubble details={item}
              refM={i == chat.chat.length - 1 ? lastMessage : undefined}
              className={item.sender.id != user.id ? 'left' : 'right'} />
            )) : <p className="p-4 text-[#fff3]">send a message to start conversation... </p>}
          </main>
          <Input id={chatId} />
        </div>
      )
    }
  </>)
}

export type Chat = {
  id: string,
  chat: singleChat[]
}

export type singleChat = {
  text: string,
  time: number,
  photoUrl: string,
  sender: user_basic_info,
  receiver: user_basic_info,
  id: string
}

export type user_basic_info = {
  username: string,
  name: string,
  id: string,
  avatar: string
}