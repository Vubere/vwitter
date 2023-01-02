import { getAuth } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { details } from "../pages/Signup/signupFlow";
import { Dispatch, SetStateAction } from "react";

export const UserCon = createContext < {
  user: user_info | undefined, setUser: (u:user_info|undefined)=>void}|undefined>(undefined)

export default function UserContext({children}:{children:React.ReactNode}){

  const [user, set] = useState<user_info|undefined>()
  const auth = getAuth()

  const setUser = (u:user_info|undefined) => {
    localStorage.setItem('user', JSON.stringify(u))
    set(u)
  }

  
  useEffect(()=>{
    if(auth.currentUser!=null){
      const ls = localStorage.getItem('user') 
      if(ls){
        const lsUser:user_info = JSON.parse(ls)
        set(lsUser)
      }
    }else{
      localStorage.removeItem('user')
    }
  }, [])

  return(
    <UserCon.Provider value={{user, setUser}}>
      {children}
    </UserCon.Provider>

  )
}

export type user_info = {
  details:details,
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