
import Avatar from "../icon"

import avatar from "../../assets/avatar.jpg"
import { Link, useNavigate } from "react-router-dom"

import * as routes from '../../constants/route'
import { useContext, useEffect } from "react"
import { UserCon } from "../../context/UserContext"
import { getAuth } from "firebase/auth"


export default function SN_Header() {
  const user = useContext(UserCon)

  if(user?.user==undefined){
    return null
  }

  return (<div className=" w-full z-[8999] p-4 pt-6">
    <div className="mb-3">
      <Link to={routes.profile + '/' + user?.user?.details.username} className='inline w-[40px]'>
        <Avatar
          width="40px"
          height="40px"
          src={user.user.avatar||avatar}
          className='rounded-full' />
      </Link>
    </div>
    <div className="mb-2 mt-2">
      <Link to={routes.profile + '/' + user?.user?.details.username} className='inline'>
        <p className="font-[600]">{user.user.details.name}</p>
        <p className="text-[14px] text-[#fff6]">@{user.user.details.username}</p>
      </Link>
    </div>
    <div>
      <Link to={routes.following}>
        <p className="inline">{user.user.following.length} <span className="text-[14px] text-[#fff6]">Following</span></p>{' '}
      </Link>
      <Link to={routes.followers}>
        <p className="inline ml-2">{user.user.followers.length} <span className="text-[14px] text-[#fff6]">Followers</span></p>
      </Link>
    </div>
  </div>
  )
}