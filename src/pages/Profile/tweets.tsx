import { useContext, useEffect, useLayoutEffect, useState } from "react"
import PostItem, { PostItem as itemtype } from "../Dashboard/home/components/PostItem"

import avatar from '../../assets/avatar.jpg'
import { UserCon } from "../../context/UserContext"

export default function tweets(){
  const [posts, setPosts] = useState<itemtype[]>(/* [{
    type: 'retweet',
    retweeter: {
      avatar: '',
      username: 'victorubere',
      full_name: 'Victor Ubere',
      id: 'asduhp'
    },
    comments: [{
      text: 'aum',
      likes: [''],
      replies: [],
      photoUrl: '',
      date: '',
      commentOwner: {
        avatar: '',
        username: 'victorubere',
        full_name: 'Victor Ubere',
        id: 'asduhp'
      }
    }],
    post_owner: {
      avatar: '',
      username: 'victorubere',
      full_name: 'Victor Ubere',
      id: 'aupsd'
    },
    photoUrl: avatar,
    likes: [''],
    caption: 'this is a test data',
    date: '20m',
    id: 'adfas'
  },
  ] */)

  const user = useContext(UserCon)
  if(user?.user==undefined){
    return null
  }
  useLayoutEffect(()=>{
    
  }, [])

  return(
    <section className="flex flex-col justify-center items-center w-[100%]">
      {
        posts?.length?(
          posts.map((item)=>(
            <PostItem details={item}/>
          ))
        ):<p className="p-2">no tweets...</p>
      }
    </section>
  )
}