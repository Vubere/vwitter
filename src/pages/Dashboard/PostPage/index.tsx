import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { PostItem } from "../home/components/PostItem"
import Icon from "../../../components/icon"


import avatar from '../../../assets/avatar.jpg'
import Back from "../../../components/Back"
import reply from '../home/components/Reactions/reply.png'
import like from '../home/components/Reactions/like.png'
import likeFilled from '../home/components/Reactions/likeFilled.png'
import retweet from '../home/components/Reactions/retweet.png'
import retweetFilled from '../home/components/Reactions/retweetFilled.png'
import Comment from "./components/comment"



export default function PostPage() {
  const [post, setPost] = useState<PostItem | undefined>({
    comments: [{
      text: 'aum',
      likes: [''],
      photoUrl: '',
      date: '40m',
      commentOwner: {
        avatar: '',
        username: 'victorubere',
        full_name: 'Victor Ubere',
        id: 'u23h'
      },
      replies: [{
        text: 'text',
        photoUrl: avatar,
        likes: [''],
        date: '40m',
        commentOwner: {
          avatar: '',
          username: 'hakk',
          full_name: 'hakk rubee',
          id: 'adhs',
        },
        replies: []
      }]
    }],
    post_owner: {
      avatar: '',
      username: 'victorubere',
      full_name: 'Victor Ubere',
      id: 'hiaph'
    },
    photoUrl: avatar,
    likes: [''],
    caption: 'this is a test data',
    date: '20m',
    id: 'dah'
  })
  const navigate = useNavigate()

  if (post == undefined) {
    return (<p>loading</p>)
  }
  return (
    <section className="overflow-auto pb-20 pt-10">
      <header className="w-full min-h-[20px] p-3 pl-14 bg-black fixed top-0">
        <Back className="w-[20px] h-[20px] absolute top-4 left-3" click={() => navigate('/home')} />
        <h3 className="font-[600] text-[18px]">Thread</h3>
      </header>
      <section className="w-[100vw] p-4 pt-6 pb-0 flex flex-col gap-3 border-b border-[#fff2] items-center overflow-auto">
        <div className="flex gap-3 w-full">
          <Icon
            src={`${post.post_owner.avatar != '' ? post.post_owner.avatar : avatar}`}
            width='45px'
            height="45px"
            className="rounded-full"
          />
          <div className="">
            <p className="font-[600]">{post.post_owner.full_name}</p>
            <p className="text-[#fff6]">@{post.post_owner.username}</p>
          </div>
        </div>
        <section className="w-full ">
          <div className="border-b border-[#fff4] w-full pb-3">
            <p className="text-[#fff] text-[22px] pb-3">{post.caption}</p>
            <div className="max-h-[300px] overflow-hidden flex items-center rounded-[10px]">
              <img src={post.photoUrl}
                width='100%' className='rounded-[10px]' />
            </div>
            <p className="text-[#fff6] mt-3 ">{post.date}</p>
          </div>
          <div className="flex gap-5 pl-4 items-center h-[50px] border-b border-[#fff4]">
            <p>{post.comments.length} <span className="text-[#fff4]">Replies</span></p>
            <p>{post.likes.length} <span className="text-[#fff4]">Retweets</span></p>
            <p>{post.likes.length} <span className="text-[#fff4]">Likes</span></p>
          </div>
          <div className="flex  w-[75%] justify-between p-5 h-[30px]">
            <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
              <Icon
                src={reply}
                width="20px"
                height='20px'
              />
            </p>
            <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
              <Icon
                src={retweet}
                width="25px"
                height='25px'
              />
            </p>
            <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
              <Icon
                src={like}
                width="20px"
                height='20px'
              />
            </p>
          </div>
        </section>
      </section>
      <section>
        {post.comments.map((item) => <Comment details={item} postowner={post.post_owner}/>)}
      </section>
    </section>
  )
}