import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { lazy, useContext, useDeferredValue, useLayoutEffect, useMemo, useState } from "react";


import Icon from "../../components/icon";
import avatar from "../../assets/avatar.jpg"
import Back from "../../components/Back";


import * as routes from '../../constants/route'

import getUserByUsername from "../../services/getUserByUsername";
import UserContext, { UserCon, user_info } from "../../context/UserContext";

import Tweets from "./tweets";
import Replies from "./replies";
import Likes from "./likes";
import { getAuth } from "firebase/auth";
import mail from '../../components/assets/mail.png'
import Load from "../../components/load";
import { arrayRemove, arrayUnion, doc, increment, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../main";
import { user_basic_info } from "../Chat";
import getUserById from "../../services/getUserById";



export default function Profile() {

  const navigate = useNavigate()
  const [user, setUser] = useState<user_info | undefined>()
  const { username } = useParams()

  const [view, setView] = useState<'tweet' | 'likes'>('tweet')
  const { currentUser } = getAuth()

  const [loading, setLoading] = useState(false)
  const [curUser, setCurUser] = useState<user_basic_info>()

  const [following, setFollowing] = useState(false)

  useLayoutEffect(() => {
    if (username) {
      const fetchUser = async () => {
        setLoading(true)
        try {
          const userDetails = await getUserByUsername(username)
          setUser(userDetails)
          const userRef = doc(db, 'users', userDetails.details.id)
          if(currentUser){
            setFollowing(userDetails.followers.includes(currentUser.uid))
          }
          const res = onSnapshot(userRef, (doc)=>{
            const s = doc.data() as user_info|undefined
            if(s){
              setUser(s)
            }
          })
          if (currentUser) {
            const res = await getUserById(currentUser.uid)
            setCurUser(res.details)
          }
          setLoading(false)
        } catch (err) {
          setLoading(false)
          navigate(-1)
        }
      }
      fetchUser()
    }
  }, [username])
  
  if (loading) {
    return <Load />
  }
  
  if (!user || currentUser == null) {
    return null
  }
  const text = following ? 'unfollow' : 'follow'

  const toggleFollow = async () => {
    if (user && curUser) {
      const userRef = doc(db, 'users', user.details.id)
      const curUserRef = doc(db, 'users', curUser.id)
      const userId = user.details.id
      if (text == 'unfollow') {
        setFollowing(false)
        await updateDoc(userRef, {
          followers: arrayRemove(curUser.id)
        })
        await updateDoc(curUserRef, {
          following: arrayRemove(userId)
        })
      } else {
        setFollowing(true)
        await updateDoc(userRef, {
          followers: arrayUnion(curUser.id)
        })
        await updateDoc(curUserRef, {
          following: arrayUnion(userId)
        })
        const notifId = userId + 'f' + Date.now()
        const notifRef = doc(db, 'notifications', userId)
        await setDoc(notifRef, {
          type: 'follow',
          user: user.details.id,
          ref: '',
          id: notifId
        })
        await updateDoc(userRef, {
          notificatiions: arrayUnion(notifId),
          unread_notifications: increment(1)
        })
      }
    }
  }


  return (
    <div>
      <header>
        <div className="relative h-[120px] w-full border-b border-[#fff1]">
          <div className=" absolute left-2 top-2 bg-[#0003] rounded-full p-1">
            <Back click={() => navigate(-1)} className="w-[20px] h-[20px]" />
          </div>

          <Icon src={user.details.avatar || avatar}
            width='70px' height='70px' className='rounded-full outline outline-[#fff1] absolute bottom-[-30px] left-[15px]' />
        </div>
        {currentUser.uid == user.id ? (<Link to={routes.edit_profile + '/' + user.id} className='w-full'>
          <button className="float-right border border-[#fff4]  rounded-full w-[110px] h-[35px] m-2 clear-both">Edit Profile</button>
        </Link>) : (<div className="flex flex-row gap-2 float-right clear-both items-center">
          <Link to={'/chat' + '/' + user.details.username}>
            <Icon src={mail} width='26px' height="26px" />
          </Link>
          <button className=" border border-[#fff4]  rounded-full w-[90px] h-[35px] m-2" onClick={toggleFollow}>
            {text}
          </button>
        </div>)}
        <section className="mt-14 pl-3 pr-3 pb-10">
          <p className="font-[700] text-[22px] mb-1 p-0 h-[22px]">{user?.details.name}</p>
          <p className="text-[#fff4] m-0 p-0">@{user?.details.username}</p>
          <p className="text-[14px] mt-3">{user.details.bio}</p>
          <div className="flex gap-4 mt-4">
            <Link to={routes.following + '/' + user.details.username}>
              <p className="text-[#fff4]"><span>{user.following.length}</span> Following</p>
            </Link>
            <Link to={routes.followers + '/' + user.details.username}>
              <p className="text-[#fff4]"><span>{user.followers.length}</span> Followers</p>
            </Link>
          </div>
        </section>
      </header>
      <nav>
        <ul className="flex justify-around">

          <li className={`${view == 'tweet' ? 'border-[#00acee] border-b border-b-2' : null} p-2`}
            onClick={() => setView('tweet')} >Tweets</li>

          {/*  <li className={`${view == 'replies' ? 'border-[#00acee] border-b border-b-2' : null} p-2`}
            onClick={() => setView('replies')}>Replies</li> */}

          <li className={`${view == 'likes' ? 'border-[#00acee] border-b border-b-2' : null} p-2`}
            onClick={() => setView('likes')}>Likes</li>
        </ul>
      </nav>
      <main className="w-full flex flex-col items-center">
        {view == 'tweet' ? <Tweets id={user.details.id} /> : <Likes id={user.details.id} />}
      </main>
    </div>
  )
}

