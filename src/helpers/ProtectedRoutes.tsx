import React, {useEffect} from "react"
import { getAuth } from "firebase/auth"
import { Navigate, useNavigate } from "react-router-dom"

export default function ProtectedRoutes({children}:{children:React.ReactNode}){
  const navigate = useNavigate()
  const {currentUser} = getAuth()

  useEffect(()=>{
    if(currentUser==null){
      navigate('/login')
    }
  }, [])
  return(
    <>
      {currentUser&&children}
    </>
  )
}