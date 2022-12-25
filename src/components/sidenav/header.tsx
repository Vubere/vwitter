
import Avatar from "../icon"

import avatar from "../../assets/avatar.jpg"


export default function SN_Header() {
  return (
    <div className=" w-full z-[8999] p-4 pt-6">
      <div className="mb-3">
        <Avatar
          width="40px"
          height="40px"
          src={avatar}
          className='rounded-full' />
      </div>
      <div className="mb-2 mt-2">
        <p className="font-[600]">Victor Ubere</p>
        <p className="text-[14px] text-[#fff6]">@victorubere</p>
      </div>
      <div>
        <p className="inline">70 <span className="text-[14px] text-[#fff6]">Following</span></p>{' '}
        <p className="inline ml-2">65 <span className="text-[14px] text-[#fff6]">Followers</span></p>
      </div>
    </div>
  )
}