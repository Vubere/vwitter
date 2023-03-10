import { useLayoutEffect, useState } from "react";
import Icon from "../../../../components/icon";

import liked from "../../../../components/Reactions/likeFilled.png"
import retweeted from '../../../../components/Reactions/retweetFilled.png'
import avatar from "../../../../assets/avatar.jpg"


import { notifications } from "..";
import { user_basic_info } from "../../../Chat";

import getUserById from "../../../../services/getUserById";


export default function LikedNotif ({
  details
}:{details:notifications}) {

  const [user, setUser] = useState<user_basic_info>()

  useLayoutEffect(()=>{
    (async()=>{
      const u = await getUserById(details.user)
      if(u){
        setUser(u.details)
      }
    })()
  }, [])

  if(!user){
    return null
  }

  return(
    <div className="w-full flex p-3 gap-2 border-b-[0.1em] border-[#fff2] pl-5">
      <Icon
      src={details.type=='retweet'?retweeted:liked}
      width='32px'
      height='32px'
      className='rounded-full'
      />
      <div className="w-[80%]">
        <Icon src={user.avatar||avatar} width="40px" height="40px" className="rounded-full mb-2 border border-[#fff3]"/>
        <p className="mb-2"><span className="font-[700]">{user.name}</span> {details.type=='like'?'liked':'retweeted'} your {details.ref.res}</p>
        <p className="text-[#fff4]">{details.ref.info}</p>
      </div>
    </div>
  )
}