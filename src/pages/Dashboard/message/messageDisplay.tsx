import { Link } from "react-router-dom";
import Icon from "../../../components/icon";

import * as routes from '../../../constants/route'
import { Chat, user_basic_info } from "../../Chat";


import avatar from "../../../assets/avatar.jpg"
import { useContext, useLayoutEffect, useState } from "react";
import { singleChat } from "../../Chat";
import { UserCon } from "../../../context/UserContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../main";
import { formatDistanceToNow } from "date-fns";


export default function MessageDisplay({ id }: { id: string }) {

  const [details, setDetails] = useState<singleChat>()
  const context = useContext(UserCon)

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
    console.log('here')
  }, [])

  if (!details || !context?.user?.details) {
    return null
  }
  const { user: { details: user } } = context
  const party = user.id == details.sender.id ? details.receiver : details.sender
  

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
            <p className="text-[14px] text-[#fff6]">{formatDistanceToNow(details.time)}</p>
          </div>
          <div className="h-[14px] text-[#fff6] text-14px p-1">
            {details.text.length > 15 ? details.text.slice(0, 15) + '...' : details.text}
          </div>
        </Link>
      </div>
    </div>
  )
}

