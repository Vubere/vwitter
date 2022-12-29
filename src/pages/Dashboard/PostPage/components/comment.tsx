import { Comments, user_details } from "../../home/components/PostItem";
import Avatar from "../../../../components/icon"

import avatar from '../../../../assets/avatar.jpg'
import Reactions from "../../home/components/Reactions"



export default function Comment({details, postowner}:{details:Comments, postowner:user_details}){


  const {text, likes, commentOwner, photoUrl, replies,date } = details


  return(
    <div>
      <section className="w-full p-3 pt-6 pb-2 flex gap-3 border-b border-[#fff2]">
        <div>
          <Avatar
            src={`${commentOwner.avatar != '' ? commentOwner.avatar : avatar}`}
            width='45px'
            height="45px"
            className="rounded-full"
          />
        </div>
        <div className="w-full pr-4">
          <div className="flex gap-1">
            <p className="font-[600]">{commentOwner.full_name}</p>
            <p className="text-[#fff6]">@{commentOwner.username}</p>
            <p className="text-[#fff6]">{date}</p>
          </div>
          <p><span className="text-[#fff3]">Replying to </span><span className="text-[#00acee]">@{postowner.username}</span></p>
          <div>
            <p className="text-[#fff9] pb-0">{text}</p>
            <div className="max-h-[300px] overflow-hidden flex items-center rounded-[10px]">
              <img src={photoUrl}
                width='100%' className='rounded-[10px]' />
            </div>
          </div>
          <Reactions likes={likes} comments={replies} />
        </div>
      </section>
    </div>
  )
}