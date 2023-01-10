import { Comments } from "../../home/components/PostItem";
import { user_info } from "../../../../context/UserContext";

import Avatar from "../../../../components/icon"

import avatar from '../../../../assets/avatar.jpg'

import Icon from "../../../../components/icon";

import { getAuth } from "firebase/auth";

import like from '../../home/components/Reactions/like.png'
import likeFilled from '../../home/components/Reactions/likeFilled.png'
import { useLayoutEffect, useState } from "react";
import { details } from "../../../Signup/signupFlow";
import { formatDistanceToNow } from "date-fns";
import { minimalDistance } from "../../../../helpers/date";
import { Link } from "react-router-dom";

import * as routes from '../../../../constants/route'
import { user_basic_info } from "../../../Chat";
import getUserById from "../../../../services/getUserById";

export default function Comment({ details, postowner:poId }: {
  details: Comments, postowner: string}) {
  const [likedCheck, setLikes] = useState<string[]>(details.likes)
  const [commentOwner,setCommentOwner] = useState<user_basic_info>()
  const [postowner, setPostOwner] = useState<user_basic_info>()

  const { text, likes,  photoUrl, date } = details

  const { currentUser } = getAuth()

  useLayoutEffect(()=>{
    (async () => {
      const cO = await getUserById(details.commentOwner)
      const pO = await getUserById(poId)
      if(cO&&pO){
        setCommentOwner(cO.details)
        setPostOwner(pO.details)
      }

    })()
  },[])

  
  if(!commentOwner||!postowner){
    return null
  }

  return (
    <div>
      <section className="w-full p-3 pt-6 pb-2 flex gap-3 border-b border-[#fff2]">
        <div>
          <Link to={routes.profile + '/' + commentOwner.username}>
            <Avatar
              src={`${commentOwner.avatar != '' ? commentOwner.avatar : avatar}`}
              width='45px'
              height="45px"
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="w-full pr-4">
          <div className="flex gap-1 text-[14px]">
            <Link to={routes.profile + '/' + commentOwner.username}>
              <p className="font-[600]">{commentOwner.name}</p>
            </Link>
            <Link to={routes.profile + '/' + commentOwner.username}>
              <p className="text-[#fff6]">@{commentOwner.username}</p>
            </Link>
              <p className="text-[#fff6]">{minimalDistance(formatDistanceToNow(Number(date)))}</p>
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