import { Chat, singleChat } from ".";
import Icon from "../../components/icon";
import avatar from '../../assets/avatar.jpg'
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../main";

export default function ChatBubble({ details, className, refM, chatId }: { details: singleChat, className: 'left' | 'right', refM: React.MutableRefObject<HTMLDivElement> | undefined , chatId: string|undefined}) {
  const [deleted, setDeleted] = useState(false)
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    if (refM?.current) {
      refM.current.scrollIntoView(true)
    }
  }, [])

  const deleteMessage = async () => {
    if(!chatId)
    return
    const docRef = doc(db, 'chats', chatId)
    const r = await getDoc(docRef)
 
    if (r.data()) {
      const { chat } = r.data() as Chat
     
      const cf = chat.filter((v) => v.id != details.id)
      await updateDoc(docRef, {
        chat: cf
      })
      setDeleted(true)
    }
  }
  if (deleted) {
    return null
  }

  return (
    <div className={`float-${className} clear-both max-w-[80%] mb-2 relative`} ref={refM}
      onClick={() => setPopup(!popup)}>
      {popup&&className=='right' ? 
        <div className="bg-[#fff6] text-black rounded-full w-[200px] pl-3 absolute top-[-30px] right-0" onClick={()=>{
          setPopup(false)
          deleteMessage()
        }}>delete message for me</div>
      : null
      }
      <div className={`inline flex flex-col ml-4 mr-4 rounded-[20px] ${className == 'left' ? 'rounded-bl-[3px]' : 'rounded-br-[2px]'} bg-[${className == 'left' ? '#fff4' : '#00acee'}] p-3 text-wrap `}>
        <div>
          {className == 'right' && <div onClick={deleteMessage}></div>}
          <p className="w-[100%] break-all">{details.text}</p>
        </div>
        {details.photoUrl &&
          <div className="max-w-400px flex justify-center align-center ">
            <img src={details.photoUrl} alt="document" className="w-full rounded-[10px] min-h-[200px]" />
          </div>
        }
      </div>
      <p className={`ml-4 mr-4 mt-0 float-${className} text-[#fff3] text-[13px]`}>{formatDistanceToNow(details.time)}</p>
    </div>
  )
}