import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../../../main"

import Icon from "../../../components/icon"
import avatar from '../../../assets/avatar.jpg'
import Load from "../../../components/load"

import { Sidenav } from ".."
import { UserCon, user_info } from "../../../context/UserContext"

import NotifComp from "./components/notifComp"
import Comment from "../PostPage/components/comment"
import FollowedNotif from "./components/FollowedNotif"


import getUserById from "../../../services/getUserById"



export default function Notification() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)

  const [notifications, setNotifications] = useState<notifications[]>()

  const userContext = useContext(UserCon)
 
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
  
  useEffect(()=>{
    (async()=>{
      if(userContext?.user){

        const userRef = doc(db, 'users', userContext.user?.details.id)
        await updateDoc(userRef, {
          unread_notifications: 0
        })
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
      <header className="pl-3 pt-1 pb-1 border-b border-[#fff2] flex gap-4  min-h-[50px] items-center fixed top-0 w-full bg-black">
        <Icon
          width="30px"
          height="30px"
          src={userContext.user.details.avatar || avatar}
          className='rounded-full left-3 top-4'
          onClick={() => setSidenav(!sidenavOpen)} />
        <h2 className='font-[600] text-[18px]'>Notifications</h2>
      </header>
      <main className="overflow-y-auto pb-10 mt-12">
        {notifications?.length ? notifications.sort((a,b)=>b.time-a.time).map((item) => {
          
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
  id: string,
  time: number
}