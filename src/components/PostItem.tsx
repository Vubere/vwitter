import Avatar from "./icon"

import avatar from '../assets/avatar.jpg'
import Reactions from "./Reactions"
import Icon from "./icon"

import retweet from '../components/Reactions/retweet.png'
import { useEffect, useLayoutEffect, useState } from "react"


import * as routes from '../constants/route'
import { Link } from "react-router-dom"
import Load from "./load"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../main"
import { formatDistanceToNow } from "date-fns"
import { minimalDistance } from "../helpers/date"
import { user_basic_info } from "../pages/Chat"
import getUserById from "../services/getUserById"

export type postType = { id: string, type: 'tweet' | 'retweet', retweeter?: string, time: number}


export default function PostItem({ id, type, retweeter }: postType) {
  const [details, setDetails] = useState<PostItem>()
  const [postOwner, setPostOwner] = useState<user_basic_info>()
  const [retweetOwner, setRD] = useState<user_basic_info>()


  useLayoutEffect(() => {
    let unsub: any
    (async () => {
      const docRef = doc(db, 'posts', id)
      unsub = onSnapshot(docRef, (doc) => {
        const data = doc.data() as PostItem | undefined
        if (data) {
          setDetails(data)
        }
      })
    })()
    if (unsub) {
      return unsub
    }
  }, [id])



  useEffect(() => {
    if (details == undefined) {
      return
    }
    if (!('post_owner' in details)) {
      return
    };
    (async () => {
      const user = await getUserById(details.post_owner)
      if (user) {
        setPostOwner(user.details)
      }

      if (retweeter) {
        const rd = await getUserById(retweeter)
        if (rd) setRD(rd.details)
      }
    })();

  }, [details])


  if (!postOwner || !details) {
    return null
  }

  return (
    <section className="w-full p-3 pt-2 pt-6 pb-5 flex gap-1 border-b border-[#fff2] flex-col">
      {(type == 'retweet' && retweetOwner) && (
        <div className="flex gap-2 pl-3">
          <Icon src={retweet} width='20px' height="20px" />
          <Link to={routes.profile + '/' + retweetOwner.username}>
            <p className="text-[14px] text-[#fff4]">
              {retweetOwner.username} retweeted
            </p>
          </Link>
        </div>
      )}
      <div className="flex gap-3">

        <div>
          <Link to={routes.profile + '/' + postOwner.username}>
            <Avatar
              src={`${postOwner.avatar != '' ? postOwner.avatar : avatar}`}
              width='45px'
              height="45px"
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="w-full pr-4 ">
          <div className="flex gap-2 flex items-center ">
            <Link to={routes.profile + '/' + postOwner.username}>
              <p className="font-[600] text-wrap text-[14px]">{postOwner.name}</p>
            </Link>
            <Link to={routes.profile + '/' + postOwner.username}>
              <p className="text-[#fff6] text-[14px]">@{postOwner.username}</p>
            </Link>
            <p className="text-[#fff6] text-[12px]">{minimalDistance(formatDistanceToNow(Number(details.date)))}</p>
          </div>
          <div>
            <Link to={routes.postpage + '/' + id} >

              <p className="text-[#fff9] pb-3">{details.caption}</p>
              <div className="max-h-[300px] overflow-hidden flex items-center rounded-[10px]">
                {details.photoUrl && <img src={details.photoUrl}
                  width='100%' 
                  className='rounded-[10px] min-h-[200px]' />}
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
  retweeter?: string,
  post_owner: string,
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
  commentOwner: string,
  date: string,
  postOwner: string
}

