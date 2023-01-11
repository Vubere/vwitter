

import { useEffect, useLayoutEffect, useState } from 'react'
import Icon from '../../../../components/icon'
import Load from '../../../../components/load'
import getUserById from '../../../../services/getUserById'
import { user_basic_info } from '../../../Chat'
import profile from './profileFilled.png'
import avatar from '../../../../assets/avatar.jpg'

export default function FollowedNotif({id}:{id:string}){

  const [details, setDetails] = useState<user_basic_info>()


  useEffect(()=>{
    (async()=>{
      const user = await getUserById(id)
      if(user?.details){
      
        setDetails(user.details)
      }
    })()
  }, [])
  console.log(details, id)
  if(!details){
    return null
  }
  return (
    <div className='w-full flex p-3 gap-2 border-b-[0.1em] border-[#fff2] pl-5'>
      <Icon
      src={profile}
      width='30px'
      height='30px'
      />
      <div>
        <Icon
        src={details.avatar||avatar}
        width='40px'
        height='40px'
          className='rounded-full mb-2 border border-[#fff3]'
        />
        <p><span className="font-[700]">{details.name}</span> followed you</p>
      </div>
    </div>
  )
}