import Icon from "./icon"
import avatarImg from "../assets/avatar.jpg"


import { Link, useNavigate } from "react-router-dom"

import { details } from "../pages/Signup/signupFlow"
import { useContext, useState } from "react"
import { UserCon } from "../context/UserContext"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../main"
import { user_basic_info } from "../pages/Chat"

export default function UserDisplay({ details }: { details: user_basic_info }) {
  const navigate = useNavigate()
  const userContext = useContext(UserCon)
  if (!userContext?.user?.details) {
    return null
  }
  const [following, setFollowing] = useState(userContext.user.following.includes(details.id))

  const text = userContext.user.details.id == details.id ? 'profile' : following ? 'unfollow' : 'follow'

  const click = async () => {
    if(userContext.user?.details){
      const userRef = doc(db, 'users', userContext.user?.details.id)
      const docRef = doc(db, 'users', details.id)
      const userId = userContext.user.details.id
      if(text == 'profile'){
        navigate('/profile/'+userContext.user?.details.username)
      }else if(text=='unfollow'){
        setFollowing(false)
        await updateDoc(userRef, {
          following: arrayRemove(details.id)
        })
        await updateDoc(docRef, {
          followers: arrayRemove(userId)
        }) 
      }else{
        setFollowing(true)
        await updateDoc(userRef, {
          following: arrayUnion(details.id)
        })
        await updateDoc(docRef, {
          followers: arrayUnion(userId)
        }) 
      }
    }
  }


  return (
    <div
      className='flex gap-12 items-center'>
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
            <p className="m-0 p-0 h-[20px] text-white">{details.name}</p>
            <p className="m-0 p-0 h-[15px] text-[#fff6] text-[14px]">@{details.username}</p>
          </div>
        </Link>
      </div>
      <button className="w-[80px] h-[30px] font-[500] rounded-full bg-[#00acee]"
      onClick={click}>
        {text}
      </button>
    </div>
  )
}