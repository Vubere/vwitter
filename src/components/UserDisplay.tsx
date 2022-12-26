import Icon from "./icon"
import avatarImg from "../assets/avatar.jpg"

import { user_details } from "../pages/Dashboard/home/components/PostItem"

export default function UserDisplay({avatar,username, full_name}:user_details) {
  return (
    <div className="flex gap-2 h-[40px] border-box overflow-hidden">
      <Icon
        width="40px"
        height="40px"
        src={avatarImg} 
        className="rounded-full border border-[#fff3]"/>
        <div className="h-[40px]">
          <p className="m-0 p-0 h-[20px]">{full_name}</p>
          <p className="m-0 p-0 h-[15px] text-[#fff6] text-[14px]">@{username}</p>
        </div>
    </div>
  )
}