import { useState, useContext } from 'react'

import FlowButton from './button'
import Input from "../../../components/input"
import Cancel from "../../../components/CancelIcon"

import { FlowContext } from '.'

export default function StepOne({close, next}:{
  close:()=>void,
  next:()=>void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [error, setError] = useState('')
  const {details, setDetails} = useContext(FlowContext)

  const onSubmit = (e:React.FormEvent) =>{
    e.preventDefault()
    if(!name.length){
      setError('Fill in name field')
      return
    }
    if(!email.length){
      setError('Fill in email field')
      return
    }
    if(!dob.length){
      setError('You must provide a birth date')
      return
    }
    setDetails({...details, name, email, dob})
    next()
  }

  return (
    <div>
      <div className="p-3  pl-5 flex items-center  h-[70px] ">
        <Cancel className="left-[18px]" 
        click={close}/>
        <p className="font-[700] ml-8">Step 1 of 4</p>
      </div>
      <div className=" w-[85vw] ml-auto mr-auto flex flex-col ">
        <h2 className="font-[700] text-[24px] mt-4">
          Create your account
        </h2>
        <form onSubmit={onSubmit}
        className='w-full flex flex-col'>
          <Input
            type="name"
            name="Name"
            value={name}
            changeHandler={(e: any) => setName(e.target.value)}
            placeholder='Name'
            className="mt-8"
          />
          <Input
            type="email"
            name="Email"
            value={email}
            changeHandler={(e: any) => setEmail(e.target.value)}
            placeholder='Email'
            className="mt-8"
          />
          <div className="mt-8">
            <h4 className="font-[500] text-[14px] mb-2">Date of birth</h4>
            <p className="text-[#fff6] text-[14px]">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
            <Input
              type="date"
              name="Date-of-birth"
              placeholder="Date-of-birth"
              value={dob}
              changeHandler={(e) => setDob(e.target.value)}
              className='mt-8'
              inputClassname={`w-[12px] ${dob!=''?'block':'visibility-none text-white'}`} />
          </div>
          <FlowButton className='fixed bottom-[15px] left-[50%] translate-x-[-50%] w-[86%]'>
            Next
          </FlowButton>
        </form>
      </div>
    </div>
  )
}