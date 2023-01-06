import React, { useContext, useEffect, useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Navigate, useNavigate } from "react-router-dom"
import { UserCon, user_info } from "../context/UserContext"


export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const auth = getAuth()

  
  const [userauth, setUserAuth] = useState<any>(auth.currentUser)

  useEffect(() => {
    const ls = localStorage.getItem('user')
    if (ls) {
      const user:user_info = JSON.parse(ls)
      if (auth.currentUser == null) { 
        (async () => {
          if (user?.details){
            try{
              await signInWithEmailAndPassword(auth, user.details.email, user.details.password)
              setUserAuth(auth.currentUser)
            }catch(err){
              navigate('/login')
            }
          }
          
        })()
      }
    } else {
      navigate('/login')
    }
  }, [])
  return (
    <>
      {userauth && children}
    </>
  )
}