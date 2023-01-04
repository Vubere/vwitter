import { Comments} from "../../home/components/PostItem";
import { user_info } from "../../../../context/UserContext";

import Avatar from "../../../../components/icon"

import avatar from '../../../../assets/avatar.jpg'

import Icon from "../../../../components/icon";

import { getAuth } from "firebase/auth";

import like from '../../home/components/Reactions/like.png'
import likeFilled from '../../home/components/Reactions/likeFilled.png'
import { useState } from "react";
import { details } from "../../../Signup/signupFlow";
import { formatDistanceToNow } from "date-fns";

export default function Comment({details, postowner}:{details:Comments, postowner:{
  name: string,
  username: string,
  avatar: string,
  id: string
}}){
  const [likedCheck, setLikes] = useState<string[]>(details.likes)

  const {text, likes, commentOwner, photoUrl, replies,date } = details

  const {currentUser} = getAuth()


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
          <div className="flex gap-1 text-[14px]">
            <p className="font-[600]">{commentOwner.name}</p>
            <p className="text-[#fff6]">@{commentOwner.username}</p>
            <p className="text-[#fff6]">{formatDistanceToNow(Number(date))}</p>
          </div>
          <p><span className="text-[#fff3]">Replying to </span><span className="text-[#00acee]">@{postowner.username}</span></p>
          <div>
            <p className="text-[#fff9] pb-0">{text}</p>
            <div className="max-h-[300px] overflow-hidden flex items-center rounded-[10px]">
              <img src={photoUrl}
                width='100%' className='rounded-[10px]' />
            </div>
          </div>
          <div className='flex justify-between pt-3 w-[85%]'>
            <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
              <Icon
                src={currentUser ? likedCheck.includes(currentUser.uid) ? likeFilled : like : like}
                width="20px"
                height='20px'
              />{' '}
              {likes.length}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}