import React, { useContext, useState } from 'react'

import Back from "../../../components/Back"
import FlowButton from "./button"

import check from "../../../assets/checkmark.png"

import { FlowContext } from '.'


import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../main'

import { UserCon, user_info } from '../../../context/UserContext'

export default function stepThree({ next, prev, reset }: {
  next: () => void,
  prev: () => void,
  reset: () => void
}) {
  const { details,  } = useContext(FlowContext)
  const userContext = useContext(UserCon)
  const [error, setError] = useState('')

  const signup = () => {
    const auth = getAuth()
    return async () => {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, details.email, details.password)
        const col = doc(db, 'users', user.uid)
        
        const userInfo:user_info = {
          details:{...details, id: user.uid},
          id: user.uid,
          followers: [],
          following: [],
          notifications: [],
          messages: [],
          likes: [],
          replies: [],
          posts: [],
          unread_notifications: 0,
          unread_messages: 0
        }
     
        await setDoc(col, userInfo)
        
        if (userContext) {
          userContext.setUser(userInfo)
        }
        next()
      }catch(err:any){
        let m :string = err.message
        if(m.includes('email-already-in-use')){
          setError('email already in use')
          setTimeout(()=>{
            setError('')
            reset()
          }, 2000)
        }
      }
    }
  }
  const submit = async () => {
    await signup()()
  }

  return (
    <div>
      <div className="flex items-center m-3">
        <Back className="w-[40px] h-[20px] m-3" click={prev} />
        <p> Step 3 of 4</p>
      </div>
      <div className="flex flex-col items-center">
        <h3 className='w-[90%] ml-auto mr-auto mt-8 font-[700] text-[22px]'>Confirm details</h3>
        {error&& <p className='pt-3 pb-3 text-[#f008]'>{error}</p>}
        <p className="w-[90%] h-[60px] border pl-2 bg-transparent border-[#fff4] text-[#fff] rounded-[5px] flex flex-col justify-center mt-5">
          {details.name}
          <img src={check} alt=''
            width='20px' height='20px' className='absolute right-[30px]' />
        </p>
        <p className="w-[90%] h-[60px] border pl-2 bg-transparent border-[#fff4] text-[#fff] rounded-[5px] flex flex-col justify-center mt-5">
          {details.email}
          <img src={check} alt=''
            width='20px' height='20px' className='absolute right-[30px]' />
        </p>
        <p className="w-[90%] h-[60px] border pl-2 bg-transparent border-[#fff4] text-[#fff] rounded-[5px] flex flex-col justify-center mt-5">
          {details.dob.year + '-' + details.dob.month + '-' + details.dob.day}
          <img src={check} alt=''
            width='20px' height='20px' className='absolute right-[30px]' />
        </p>
        <FlowButton click={submit} className='fixed bottom-[15px] w-[86%]'>
          Next
        </FlowButton>
      </div>
    </div>
  )
}