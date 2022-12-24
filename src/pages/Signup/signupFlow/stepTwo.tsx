import {useState, useContext} from 'react'

import FlowButton from './button'
import Back from "../../../components/Back"
import Input from "../../../components/input"

import { FlowContext } from '.'

export default function StepTwo({next, prev}:{
  next: ()=>void,
  prev: ()=>void
}){
  const {details, setDetails} = useContext(FlowContext)

  const [pwd, setPwd] = useState('')
  const [conPwd, setConPwd] = useState('')

  const [error, setError] = useState('')

  const onSubmit = (e:React.FormEvent) =>{
    e.preventDefault()
    if(!pwd){
      setError('you must fill in the password field')
      return
    }
    if(pwd!=conPwd){
      setError('passwords do not match')
      return
    }
    setDetails({
      ...details,
      password: pwd
    })
    next()
  }


  return(
    <div>
      <div className="flex items-center m-3">
        <Back className="w-[40px] h-[20px] m-3"
        click={prev}/>
        <p> Step 2 of 4</p>
      </div>

      <h3 className='w-[90%] ml-auto mr-auto mt-8 font-[700] text-[22px]'>Choose your Password</h3>
      <form onSubmit={e=>e.preventDefault()}
      className='w-full flex flex-col items-center mt-6'>
        <Input
        type="password"
        name="Password"
        value={pwd}
        placeholder=""
        className="w-[90%] mt-6"
        changeHandler={(e)=>setPwd(e.target.value)}/>
        <Input
        type="password"
        name="Confirm Password"
        value={conPwd}
        placeholder=""
        className="w-[90%] mt-6"
        changeHandler={(e)=>setConPwd(e.target.value)}/>
        <FlowButton className='fixed bottom-[15px]'>
          Next
        </FlowButton>
      </form>
    </div>
  )
}