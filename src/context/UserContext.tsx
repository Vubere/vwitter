import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useRef, useState } from "react";
import { db } from "../main";
import { postType } from "../components/PostItem";
import { details } from "../pages/Signup/signupFlow";
import getUserById from "../services/getUserById";



export const UserCon = createContext<{
  user: user_info | undefined, setUser: (u: user_info | undefined) => void
} | undefined>(undefined)

export default function UserContext({ children }: { children: React.ReactNode }) {

  const [user, set] = useState<user_info | undefined>()

  const auth = getAuth()

  const setUser = (u: user_info | undefined) => {
    if (u) {
      localStorage.setItem('user', JSON.stringify(u))
      set(u)
    }
  }
  const widthRef = useRef(window.innerWidth)



  useEffect(() => {
    let unsub: any
    const ls = localStorage.getItem('user')
    if (ls) {
      const lsUser: user_info = JSON.parse(ls)
      if (user == undefined) {
        try {

          const docRef = doc(db, 'users', lsUser.details.id);
          (async()=>{
            const r = await getUserById(lsUser.details.id)
            if(r) setUser(r)
          })()
          
        } catch (err) {
         
        }
      }
    }
    if (unsub) {
      return unsub
    }
  }, [])

  if(widthRef.current>520){
    return(
      <div className="bg-black flex items-center justify-center w-[100vw] h-[100vh]">
        <p>Switch to a smaller device with width of at most 520px</p>
      </div>
    )
  }

  return (
    <UserCon.Provider value={{ user, setUser }}>
      {children}
    </UserCon.Provider>

  )
}

export type user_info = {
  details: details,
  id: string,
  followers: string[],
  following: string[],
  notifications: string[],
  messages: string[],
  likes: string[],
  replies: string[],
  posts: postType[],
  unread_notifications: number,
  unread_messages: number
}