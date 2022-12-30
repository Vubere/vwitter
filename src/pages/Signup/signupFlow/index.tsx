import React, { useState, createContext } from 'react'
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'

import StepOne from "./stepOne"
import StepTwo from "./stepTwo"
import StepThree from "./stepThree"
import StepFour from "./stepFour"
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../main'
import './signup.css'


export const FlowContext = createContext<any>(undefined)

export default function SignupFlow({ close }: { close: () => void }) {
  const [details, setDetails] = useState<details>({
    name: '',
    email: '',
    username: '',
    password: '',
    dob: '',
  })
  const [step, setStep] = useState(1)


  const increment = () => {
    if (step != 4)
      setStep(step + 1)
  }
  const decrement = () => {
    if (step != 1)
      setStep(step - 1)
  }
  const signup = (details:details) => {
    const auth = getAuth()
    return async (e:React.FormEvent) => {
      const {user} = await createUserWithEmailAndPassword(auth, details.email, details.password)
      const col = collection(db, 'users', user.uid)
      const docRef = await addDoc(col, {
        details,
        followers: [],
        following: [],
        notifications: [],
        messages: [],
        avatar: '',
      })
    }
  }
  return (
    <FlowContext.Provider value={{
      details,
      setDetails
    }}>
      {
        step === 1 ?
          <StepOne close={close} next={increment} />
          : step == 2 ?
            <StepTwo next={increment} prev={decrement} />
            : step == 3 ?
              <StepThree next={increment} prev={decrement} />
              : <StepFour close={close} />
      }
    </FlowContext.Provider>
  )
}


type details = {
  name: string,
  username: string,
  email: string,
  dob: string,
  password: string,
}