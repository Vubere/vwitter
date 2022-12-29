import Avatar from "../../../../components/icon"

import avatar from '../../../../assets/avatar.jpg'
import Reactions from "./Reactions"


export default function PostItem({ details }: { details: PostItem }) {
  return (
    <section className="w-full p-3 pt-6 pb-5 flex gap-3 border-b border-[#fff2]">
        <div>
          <Avatar
            src={`${details.post_owner.avatar != '' ? details.post_owner.avatar : avatar}`}
            width='45px'
            height="45px"
            className="rounded-full"
          />
        </div>
        <div className="w-full pr-4">
          <div className="flex gap-1">
            <p className="font-[600]">{details.post_owner.full_name}</p>
            <p className="text-[#fff6]">@{details.post_owner.username}</p>
            <p className="text-[#fff6]">{details.date}</p>
          </div>
          <div>
            <p className="text-[#fff9] pb-3">{details.caption}</p>
            <div className="max-h-[300px] overflow-hidden flex items-center rounded-[10px]">
              <img src={details.photoUrl}
                width='100%' className='rounded-[10px]' />
            </div>
          </div>
          <Reactions likes={details.likes} comments={details.comments}/>
        </div>
    </section>
  )
}

export type PostItem = {
  post_owner: user_details,
  caption: string,
  photoUrl: string,
  likes: string[],
  comments: Comments[],
  date: string,
  id: string
}

export type Comments = {
  text: string,
  photoUrl: string,
  replies:Comments[],
  likes: string[],
  commentOwner: user_details,
  date: string
}

export type user_details = {
  avatar: string,
  username: string,
  full_name: string,
  id: string
}