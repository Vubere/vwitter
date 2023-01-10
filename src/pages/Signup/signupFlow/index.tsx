import React, { useState, createContext } from 'react'


import StepOne from "./stepOne"
import StepTwo from "./stepTwo"
import StepThree from "./stepThree"
import StepFour from "./stepFour"


export const FlowContext = createContext<any>(undefined)

export default function SignupFlow({ close }: { close: () => void }) {
  const [details, setDetails] = useState<details>({
    name: '',
    avatar: '',
    email: '',
    username: '',
    password: '',
    dob: '',
    bio: '',
    id: ''
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
              <StepThree next={increment} prev={decrement} reset={() => setStep(1)} />
              : <StepFour close={close}/>
      }
    </FlowContext.Provider>
  )
}


export type details = {
  name: string,
  avatar: string,
  username: string,
  email: string,
  dob: string,
  password: string,
  bio: string,
  id: string,
}