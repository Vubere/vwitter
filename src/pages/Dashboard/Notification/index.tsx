import { useContext, useState } from "react"

import { Sidenav } from ".."
import Icon from "../../../components/icon"
import avatar from '../../../assets/avatar.jpg'
import { user_details } from "../home/components/PostItem"
import LikedNotif from "./components/LikedNotif"
import Comment from "../PostPage/components/comment"



export default function Notification() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)
  const [user, setUser] = useState<any>()
  const [notifications, setNotifications] = useState<notifications[]>([{
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
    }
  }])


  return (
  <section>
    <header className="pl-3 pt-1 pb-1 border-b border-[#fff2] flex gap-4 relative min-h-[50px] items-center">
      <Icon
        width="30px"
        height="30px"
        src={avatar}
        className='rounded-full left-3 top-4'
        onClick={() => setSidenav(!sidenavOpen)} />
      <h2 className='font-[600] text-[18px]'>Notifications</h2>
    </header>
    <main>
      {notifications.map((item)=>{
        if(item.type=='like'){
          return (<LikedNotif details={item}/>)
        }else if(item.type=='reply'){
          return(<Comment details={item.ref.res} postowner={user}/>)
        }else{
          return (
            null
          )
        }
      })}
    </main>
  </section>)
}

export type notifications = {
  type: 'reply'|'like'|'follow',
  user: user_details,
  ref: any
}