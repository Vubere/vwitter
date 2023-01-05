import { notifications } from "..";
import Icon from "../../../../components/icon";

import liked from "../../home/components/Reactions/likeFilled.png"
import avatar from "../../../../assets/avatar.jpg"
import { useLayoutEffect, useState } from "react";
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
      src={liked}
      width='32px'
      height='32px'
      className='rounded-full'
      />
      <div>
        <Icon src={user.avatar||avatar} width="40px" height="40px" className="rounded-full mb-2 border border-[#fff3]"/>
        <p className="mb-2"><span className="font-[700]">{user.name}</span> {details.type}d your {details.ref.res}</p>
        <p className="text-[#fff4]">{details.ref.info}</p>
      </div>
    </div>
  )
}