import { useState } from 'react'

import Back from "../../../components/Back"
import Input from "../../../components/input"
import Avatar from '../../../components/Avatar'
import FlowButton from './button'

import avatar from '../../../assets/avatar.jpg'
import camera from '../../../assets/cameraBlack.png'
import Cancel from '../../../components/CancelIcon'


export default function stepFour({close}:{
  close: ()=>void
}) {
  const [username, setUsername] = useState('vubere')
  const [profile, setProfile] = useState<any>(undefined)

  
  return (
    <div className='flex flex-col'>
      <div className="flex items-center mt-4 ml-4">
        <Cancel click={close} className='m-2'/>
        <p> Step 4 of 4</p>
      </div>

      <h3 className='w-[90%] ml-auto mr-auto mt-8 font-[700] text-[22px]'>Pick Username and Profile Picture</h3>
      <form onSubmit={e => e.preventDefault}
        className="w-[90%] flex flex-col items-center mr-auto ml-auto">

        <Input
          type="username"
          name="Username"
          placeholder=""
          value={username}
          changeHandler={e=>setUsername(e.target.value)} 
          className="mt-8"/>
        <label htmlFor="file"
        className='w-[120px] block mt-8 ml-auto mr-auto rounded full relative'>
          <div>
            <img src={camera} alt="camera icon" 
            className='absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]'/>
            <Avatar
            src={avatar}
            width='120px'
            height='120px'
            className='rounded-full'/>
          </div>
          <input type="file" name="profile" id="file" 
          value={profile}
          onChange={e=>setProfile(e.target.value)}
          className="hidden"/>
        </label>
        <FlowButton click={close}>
          Complete
        </FlowButton>
      </form>
    </div>
  )
}