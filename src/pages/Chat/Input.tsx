import Icon from "../../components/icon";
import picture from "../../assets/image.png"
import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { UserCon } from "../../context/UserContext";
import getUserByUsername from "../../services/getUserByUsername";
import { arrayUnion, doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../main";
import Cancel from "../../components/CancelIcon";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import sent from './send.png'


export default function Input({ id }: { id: string | undefined }) {
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<any>()

  const userContext = useContext(UserCon)

  const viewRef = useRef<any>()

  if (!userContext?.user?.details) {
    return null
  }

  const handleFileChange = (e: any) => {

    if (e.target.files) {

      setImage(e.target.files[0])
      if (e.target.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {

          if (viewRef.current != undefined) {
            viewRef.current.src = e.target?.result
          }
        }
        reader.readAsDataURL(e.target.files[0])
      }
    }
  }

  const sendMessage = async (e:React.FormEvent) => {
    e.preventDefault()
    if (id && userContext.user) {
      const user = userContext.user.details
      const party = await getUserByUsername(id)
      if (party) {
        
        
        const chatId = [party.id, userContext.user.id].sort().join('')
        const storage = getStorage()
        const filePath = `users/${user.id}/chats/${chatId}/${Date.now}`
        const storageRef = ref(storage, filePath)
        let path = ''
        if (image != undefined) {
          const res = await uploadBytes(storageRef, image)
          path = await getDownloadURL(res.ref)
        }
        const docRef = doc(db, 'chats', chatId)
        await setDoc(docRef, {
          id: chatId,
          chat: arrayUnion(
            {
              text: message,
              time: Date.now(),
              photoUrl: path || '',
              sender: user.id,
              receiver: party.details.id,
              id: chatId + '' + user.username + '' + Date.now()
            })
          }, {merge:true})
          setMessage('')
        const userRef = doc(db, 'users', user.id)
        await updateDoc(userRef, {
          messages: arrayUnion(chatId),
        })
        const partyRef = doc(db, 'users', party.id)
        await updateDoc(partyRef, {
          messages: arrayUnion(chatId),
          unread_messages: increment(1)
        })
        setImage(undefined)
      }
    }
  }

  return (

    <div className="bg-black fixed bottom-0 w-full pb-2">
      {image != undefined &&
        <div className="mt-3 flex flex-col gap-2 p-4 relative">
          <Cancel onClick={() => {
            if (viewRef) {
              viewRef.current.value = null
            }
            setImage(undefined)
          }} className='absolute top-2 left-2'/>
          <img ref={viewRef} alt="imagePreview" src="#" className='w-[100px] rounded-[8px] border border-[#fff3]' />
        </div>
      }
      <form onSubmit={sendMessage} className='w-[full]  bg-[#fff2] w-[95%] mr-auto ml-auto  h-[50px] rounded-full flex items-center pl-4 focus:flex-col'>
        <label htmlFor="file">
          <Icon src={picture} width='20px' height='20px' />
          <input type="file" id='file'
            onChange={handleFileChange}
            className="absolute left-2 top-[50%] transform translate-y-[-50%] hidden" />
        </label>
        <input
          type='text'
          placeholder="Start a message"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          className="bg-transparent w-[80%] ml-4 placeholder:text-[#fff4]" />
          <button type="submit">
            <Icon width='25px' height='25px' src={sent} />
          </button>
      </form>
    </div>

  )
}