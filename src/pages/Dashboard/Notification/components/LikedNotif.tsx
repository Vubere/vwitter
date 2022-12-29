import { notifications } from "..";
import Icon from "../../../../components/icon";

import liked from "../../home/components/Reactions/likeFilled.png"
import avatar from "../../../../assets/avatar.jpg"


export default function LikedNotif ({
  details
}:{details:notifications}) {
  return(
    <div className="w-full flex p-3 gap-2 border-b-[0.1em] border-[#fff2] pl-5">
      <Icon
      src={liked}
      width='32px'
      height='32px'
      className='rounded-full'
      />
      <div>
        <Icon src={avatar} width="40px" height="40px" className="rounded-full"/>
        <p className="mb-2"><span className="font-[700]">{details.user.full_name}</span> liked your {details.ref.res}</p>
        <p className="text-[#fff4]">{details.ref.info}</p>
      </div>
    </div>
  )
}