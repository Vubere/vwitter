import Icon from "./icon"
import avatarImg from "../assets/avatar.jpg"


import { Link, useNavigate } from "react-router-dom"


import { useEffect, useState } from "react"
import { user_info } from "../context/UserContext"
import { arrayRemove, arrayUnion, doc, increment, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../main"
import { user_basic_info } from "../pages/Chat"
import getUserById from "../services/getUserById"
import { getAuth } from "firebase/auth"

export default function UserDisplay({ details }: { details: user_basic_info }) {
  const navigate = useNavigate()
  const [user, setUser] = useState<user_info>()
  const [following, setFollowing] = useState(false)
  const {currentUser} = getAuth()

  useEffect(()=>{
    if(currentUser)
    (async()=>{
      const u = await getUserById(currentUser.uid)
      setUser(u)
      if(u.following.includes(details.id))
      setFollowing(true)
    })()
  }, [])
  if (!user) {
    return null
  }
  const text = user.details.id == details.id ? 'profile' : following ? 'unfollow' : 'follow'

  const click = async () => {
    if (user) {
      const userRef = doc(db, 'users', user.details.id)
      const docRef = doc(db, 'users', details.id)
      const userId = user.details.id
      if (text == 'profile') {
        navigate('/profile/' + user.details.username)
      } else if (text == 'unfollow') {
        setFollowing(false)
        await updateDoc(userRef, {
          following: arrayRemove(details.id)
        })
        await updateDoc(docRef, {
          followers: arrayRemove(userId)
        })
      } else {
        setFollowing(true)
        await updateDoc(userRef, {
          following: arrayUnion(details.id)
        })
        await updateDoc(docRef, {
          followers: arrayUnion(userId)
        })
        const notifId = userId + 'f' + Date.now()
        const notifRef = doc(db, 'notifications', notifId)
        await setDoc(notifRef, {
          type: 'follow',
          user: user.details.id,
          ref: '',
          id: notifId,
          time: Date.now()
        })
        await updateDoc(docRef, {
          notifications: arrayUnion(notifId),
          unread_notifications: increment(1)
        })
      }
    }
  }


  return (
    <div
      className='flex gap-12 items-center justify-between w-full'>
      <div className="flex gap-2 h-[40px] border-box overflow-hidden">
        <Link to={`/profile/${details.username}`}>
          <Icon
            width="40px"
            height="40px"
            src={details.avatar || avatarImg}
            className="rounded-full border border-[#fff3]" />
        </Link>
        <Link to={`/profile/${details.username}`}>
          <div className="h-[40px]">
            <p className="m-0 p-0 h-[20px] text-white break-words text-[12px]">{details.name}</p>
            <p className="m-0 p-0 h-[15px] text-[#fff6] text-[12px]">@{details.username}</p>
          </div>
        </Link>
      </div>
      <button className="min-w-[80px] h-[30px] font-[500] rounded-full bg-[#00acee]"
        onClick={click}>
        {text}
      </button>
    </div>
  )
}