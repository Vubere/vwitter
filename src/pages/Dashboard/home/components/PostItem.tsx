import Avatar from "../../../../components/icon"

import avatar from '../../../../assets/avatar.jpg'
import Reactions from "./Reactions"
import Icon from "../../../../components/icon"

import retweet from '../components/Reactions/retweet.png'
import { useLayoutEffect, useState } from "react"
import getPostById from "../../../../services/getPostById"
import { details } from "../../../Signup/signupFlow"

import * as routes from '../../../../constants/route'
import { Link } from "react-router-dom"

export default function PostItem({ id }: { id: string }) {
  const [details, setDetails] = useState<PostItem>()

  useLayoutEffect(() => {
    (async () => {
      const post = await getPostById(id)

      if (post) {
        setDetails(post)
      }
    })()
  }, [id])



  if (details == undefined) {
    return null
  }

  return (
    <section className="w-full p-3 pt-2 pt-6 pb-5 flex gap-1 border-b border-[#fff2] flex-col">
      {(details.type == 'retweet' && details.retweeter) && (
        <div className="flex gap-2 pl-3">
          <Icon src={retweet} width='20px' height="20px" />
          <p className="text-[14px] text-[#fff4]">
            {details.retweeter.username} retweeted
          </p>
        </div>
      )}
      <div className="flex gap-3">

        <div>
          <Avatar
            src={`${details.post_owner.avatar != '' ? details.post_owner.avatar : avatar}`}
            width='45px'
            height="45px"
            className="rounded-full"
          />
        </div>
        <div className="w-full pr-4">
          <div className="flex gap-2">
            <p className="font-[600] text-wrap">{details.post_owner.name}</p>
            <p className="text-[#fff6]">@{details.post_owner.username}</p>
            <p className="text-[#fff6]">{details.date}</p>
          </div>
          <div>
            <Link to={routes.postpage + '/' + id} >

              <p className="text-[#fff9] pb-3">{details.caption}</p>
              <div className="max-h-[300px] overflow-hidden flex items-center rounded-[10px]">
                {details.photoUrl&&<img src={details.photoUrl}
                  width='100%' className='rounded-[10px]' />}
              </div>
            </Link>
          </div>
          <Reactions details={details} id={details.id} likes={details.likes}
            retweets={details.retweets}
            comments={details.comments} />
        </div>
      </div>
    </section>
  )
}

export type PostItem = {
  type: 'tweet' | 'retweet',
  retweeter?: details,
  post_owner: details,
  caption: string,
  photoUrl: string,
  likes: string[],
  comments: Comments[],
  retweets: string[]
  date: string,
  id: string
}

export type Comments = {
  text: string,
  photoUrl: string,
  replies: Comments[],
  likes: string[],
  commentOwner: details,
  date: string,
  postOwner: details
}

