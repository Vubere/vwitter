import { useContext, useEffect, useState } from "react"

import { Sidenav } from ".."
import Icon from "../../../components/icon"
import avatar from '../../../assets/avatar.jpg'

import NotifComp from "./components/notifComp"
import Comment from "../PostPage/components/comment"
import FollowedNotif from "./components/FollowedNotif"
import { UserCon, user_info } from "../../../context/UserContext"
import { details } from "../../Signup/signupFlow"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../main"
import { useNavigate } from "react-router-dom"
import Load from "../../../components/load"
import { getAuth } from "firebase/auth"
import getUserById from "../../../services/getUserById"



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
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {currentUser} = getAuth()

  useEffect(() => {
    const arr: notifications[] = []
    let notifArr: string[] = [];
    (async () => {
      if (currentUser) {
        setLoading(true)
        const user = await getUserById(currentUser.uid)
        const res = await getDoc(doc(db, 'users', user.details.id))
        const userInfo = res.data() as user_info | undefined
        if (userInfo) {
          notifArr = userInfo.notifications
        
        }
        notifArr.map((id, i) => {
          const notifRef = doc(db, 'notifications', id)
          const fetchNotifications = async () => {
            const res = await getDoc(notifRef)
           
            arr.push(res.data() as notifications)
            if (i == notifArr.length - 1) {
              setNotifications(arr)
              
            }
          }
          fetchNotifications()
        })
        setLoading(false)
      }
    })()
  }, [])
  
  if (userContext?.user?.details == undefined) {

    return null
  }

  if(loading){
    return <Load/>
  }
  return (
    <section className="mb-10">
      <header className="pl-3 pt-1 pb-1 border-b border-[#fff2] flex gap-4 relative min-h-[50px] items-center">
        <Icon
          width="30px"
          height="30px"
          src={userContext.user.details.avatar || avatar}
          className='rounded-full left-3 top-4'
          onClick={() => setSidenav(!sidenavOpen)} />
        <h2 className='font-[600] text-[18px]'>Notifications</h2>
      </header>
      <main className="overflow-y-auto pb-10">
        {notifications?.length ? notifications.map((item) => {
          if(item==undefined){
            
            return null
          }
          if (item.type == 'like') {
            return (<NotifComp key={item.id} details={item} />)
          } else if (item.type == 'reply') {
            return (<Comment key={item.id} details={item.ref.res} postowner={item.ref.og} />)
          } else if (item.type == 'retweet') {
            return (<NotifComp key={item.id} details={item} />)
          } else {
            console.log(item)
            return (
              <FollowedNotif key={item.id} id={item.user} />
            )
          }
        }) : <p className="p-4 text-[#fff3]">you have no notifications...</p>}
      </main>
    </section>)
}

export type notifications = {
  type: 'reply' | 'like' | 'follow' | 'retweet',
  user: string,
  ref: any,
  id: string
}