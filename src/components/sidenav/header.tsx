
import Avatar from "../icon"

import avatar from "../../assets/avatar.jpg"
import { Link } from "react-router-dom"

import * as routes from '../../constants/route'


export default function SN_Header() {
  return (
    <div className=" w-full z-[8999] p-4 pt-6">
      <div className="mb-3">
        <Link to={routes.profile} className='inline w-[40px]'>
          <Avatar
            width="40px"
            height="40px"
            src={avatar}
            className='rounded-full' />
        </Link>
      </div>
      <div className="mb-2 mt-2">
        <Link to={routes.profile} className='inline'>
          <p className="font-[600]">Victor Ubere</p>
          <p className="text-[14px] text-[#fff6]">@victorubere</p>
        </Link>
      </div>
      <div>
        <Link to={routes.following}>
          <p className="inline">70 <span className="text-[14px] text-[#fff6]">Following</span></p>{' '}
        </Link>
        <Link to={routes.followers}>
        <p className="inline ml-2">65 <span className="text-[14px] text-[#fff6]">Followers</span></p>
        </Link>
      </div>
    </div>
  )
}