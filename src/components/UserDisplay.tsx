import Icon from "./icon"
import avatarImg from "../assets/avatar.jpg"


import { Link } from "react-router-dom"

import { details } from "../pages/Signup/signupFlow"

export default function UserDisplay({ details }: { details: details }) {
  return (
    <Link to={`/profile/${details.username}`}>
      <div className="flex gap-2 h-[40px] border-box overflow-hidden">
        <Icon
          width="40px"
          height="40px"
          src={details.avatar || avatarImg}
          className="rounded-full border border-[#fff3]" />
        <div className="h-[40px]">
          <p className="m-0 p-0 h-[20px]">{details.name}</p>
          <p className="m-0 p-0 h-[15px] text-[#fff6] text-[14px]">@{details.username}</p>
        </div>
      </div>
    </Link>
  )
}