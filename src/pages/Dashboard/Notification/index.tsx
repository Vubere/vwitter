import { useContext, useState } from "react"

import { Sidenav } from ".."
import Icon from "../../../components/icon"
import avatar from '../../../assets/avatar.jpg'

import LikedNotif from "./components/LikedNotif"
import Comment from "../PostPage/components/comment"
import FollowedNotif from "./components/FollowedNotif"
import { UserCon } from "../../../context/UserContext"
import { details } from "../../Signup/signupFlow"



export default function Notification() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)
  
  const [notifications, setNotifications] = useState<notifications[]>(/* [
    {
    type: 'like',
    user: {
      username: 'godab',
      full_name: 'go dab',
      avatar: '',
      id: 'dad'
    },
    ref: {
      res: 'Tweet',
      info: 'i am a ewagoin'
    },
    id: 'dj'
  },
    {
    type: 'follow',
    user: {
      username: 'godab',
      full_name: 'go dab',
      avatar: '',
      id: 'dad'
    },
    ref: '',
    id: 'audp'
  },
    {
    type: 'reply',
    user: {
      username: 'godab',
      full_name: 'go dab',
      avatar: '',
      id: 'dad'
    },
    ref: {
      res: {
        text: 'home',
        likes: [''],
        photoUrl: '',
        date: '40d',
        replies: ['', ''],
        commentOwner: {
          username: 'visd',
          full_name: 'visd dsiv',
          avatar: '',
          id: ''
        }
      }
    },
    id: 'adufap'
  },
] */)

  const userContext = useContext(UserCon)


  if(userContext?.user?.details==undefined){
    return null
  }
  return (
  <section>
    <header className="pl-3 pt-1 pb-1 border-b border-[#fff2] flex gap-4 relative min-h-[50px] items-center">
      <Icon
        width="30px"
        height="30px"
        src={userContext.user.details.avatar||avatar}
        className='rounded-full left-3 top-4'
        onClick={() => setSidenav(!sidenavOpen)} />
      <h2 className='font-[600] text-[18px]'>Notifications</h2>
    </header>
    <main>
      {notifications?.length?notifications.map((item)=>{
        if(item.type=='like'){
          return (<LikedNotif key={item.id} details={item}/>)
        }else if(item.type=='reply'){
          return(<Comment key={item.id} details={item.ref.res} postowner={item.user}/>)
        }else{
          return (
            <FollowedNotif key={item.id} details={item.user}/>
          )
        }
      }):<p className="p-4">you have no notifications...</p>}
    </main>
  </section>)
}

export type notifications = {
  type: 'reply'|'like'|'follow',
  user: details,
  ref: any,
  id: string
}