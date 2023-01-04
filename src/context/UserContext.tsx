import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../main";
import { details } from "../pages/Signup/signupFlow";



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



  useEffect(() => {
    let unsub:any
    const ls = localStorage.getItem('user')
    if (ls) {
      const lsUser: user_info = JSON.parse(ls)
      if (user == undefined)
        (async () => {
          const docRef = doc(db, 'users', lsUser.details.id)
          unsub = onSnapshot(docRef, (doc) => {
            const data = doc.data() as user_info | undefined
            if (data) {
              setUser(data)
            }
          })

        })()
    }
    if(unsub){
      return unsub
    }
  }, [])

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
  posts: string[],
  unread_notifications: number,
  unread_messages: number
}