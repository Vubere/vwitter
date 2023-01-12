import { Link } from "react-router-dom";
import Icon from "../../../components/icon";

import * as routes from '../../../constants/route'
import { Chat, user_basic_info } from "../../Chat";


import avatar from "../../../assets/avatar.jpg"
import { useEffect, useLayoutEffect, useState } from "react";
import { singleChat } from "../../Chat";

import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../main";
import { formatDistanceToNow } from "date-fns";
import getUserById from "../../../services/getUserById";
import Load from "../../../components/load";

import { getAuth } from "firebase/auth";
import { minimalDistance } from "../../../helpers/date";
import VerticalMenu from "../../../components/verticalMenu";


export default function MessageDisplay({ id }: { id: string }) {

  const [details, setDetails] = useState<singleChat>()
  const [sender, setSender] = useState<user_basic_info>()
  const [receiver, setReceiver] = useState<user_basic_info>()

  const {currentUser} = getAuth()

  useLayoutEffect(() => {
    let unsub: any
    const fetchDetails = async () => {
      const docRef = doc(db, 'chats', id)
      unsub = onSnapshot(docRef, (doc) => {
        const data = doc.data() as Chat | undefined
        if (data) {
          const v = data.chat[data.chat.length - 1]
          setDetails(v)
        }
      })
    }
    fetchDetails()
    if (unsub) {
      return unsub
    }
    
  }, [])
  useEffect(()=>{
    if(details){
      (async()=>{
        const s = await getUserById(details.sender)
        const r = await getUserById(details.receiver)
        setSender(s.details)
        setReceiver(r.details)
      })()
    }
  },[details])

  
  if (!details || !currentUser||!sender||!receiver) {
    return null
  }
  
  const party = currentUser.uid == details.sender ? receiver : sender

  const deleteMessage = async () => {
    const user = await getUserById(currentUser.uid)
    if(user){
      const m = user.messages
      const mf = m.filter((v)=>v!=id)
      await updateDoc(doc(db, 'users', currentUser.uid), {
        messages: mf
      })
      setDetails(undefined)
    }
  }
  

  return (
    <div className="flex gap-2  pb-6 w-[100%]">
      <Link to={routes.profile+'/'+party.username}>
        <Icon
          width="43px"
          height="43px"
          src={party.avatar||avatar}
          className="rounded-full" />
      </Link>
      <div className="h-[38px] flex flex-col gap-1 ">
        <Link to={routes.chat + '/' +
          party.username}>
          <div className="flex h-[14px] gap-2">
            <div className="flex h-[16px] gap-[7px]">
              <p className="font-[600] text-[14px]">{party.name}</p>
              <p className="text-[#fff6] text-[14px]">@{party.username.slice(0, 20)}</p>
            </div>
            <span className="flex items-center h-[14px] justify-center font-[700] text-[#fff6]">.</span>
            <p className="text-[14px] text-[#fff6]">{minimalDistance( formatDistanceToNow(details.time))}</p>
          </div>
          <div className="h-[14px] text-[#fff6] text-14px p-1">
            {details.text.length > 15 ? details.text.slice(0, 15) + '...' : details.text}
          </div>
        </Link>
        <div className="absolute right-3"><VerticalMenu
          className="string"
          text="delete chat"
          click={deleteMessage} /></div>
      </div>
    </div>
  )
}

