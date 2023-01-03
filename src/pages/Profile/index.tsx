import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { lazy, useContext, useDeferredValue, useLayoutEffect, useState } from "react";


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



export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState<user_info | undefined>()
  const { username } = useParams()

  const [view, setView] = useState<'tweet' | 'replies' | 'likes'>('tweet')
  const { currentUser } = getAuth()
  const UserInfo = useContext(UserCon)

  useLayoutEffect(() => {
    if (username) {
      const fetchUser = async () => {
        try{
          const userDetails = await getUserByUsername(username)
          setUser(userDetails)
        }catch(err){
          navigate(-1)
        }
      }
      fetchUser()
    }
   
  }, [username])
  if (!user ||currentUser==null) {
    return null
  }
  console.log(user.id, currentUser.uid)

  return (
    <div>
      <header>
        <div className="relative h-[120px] w-full border-b border-[#fff1]">
          <div className=" absolute left-2 top-2 bg-[#0003] rounded-full p-1">
            <Back click={() => navigate('/home')} className="w-[20px] h-[20px]" />
          </div>
        
          <Icon src={user.details.avatar || avatar}
            width='70px' height='70px' className='rounded-full outline outline-[#fff1] absolute bottom-[-30px] left-[15px]' />
        </div>
        {currentUser.uid == user.id ? (<Link to={routes.edit_profile+'/'+user.id} className='w-full'>
          <button className="float-right border border-[#fff4]  rounded-full w-[110px] h-[35px] m-2 clear-both">Edit Profile</button>
        </Link>) : (<div className="flex flex-row gap-2 float-right clear-both items-center">
          <Link to={'/chat' + '/' + user.details.username}>
            <Icon src={mail} width='26px' height="26px" />
          </Link>
          <button className=" border border-[#fff4]  rounded-full w-[90px] h-[35px] m-2">
            {UserInfo?.user?.following.includes(user.id) ? 'unfollow' : 'follow'}
          </button>
        </div>)}
        <section className="mt-14 pl-3 pr-3 pb-10">
          <p className="font-[700] text-[22px] mb-1 p-0 h-[22px]">{user?.details.name}</p>
          <p className="text-[#fff4] m-0 p-0">@{user?.details.username}</p>
          <p className="text-[14px] mt-3">{user.details.bio}</p>
          <div className="flex gap-4 mt-4">
            <p className="text-[#fff4]"><span>{user.following.length}</span> Following</p>
            <p className="text-[#fff4]"><span>{user.followers.length}</span> Followers</p>
          </div>
        </section>
      </header>
      <nav>
        <ul className="flex justify-around">

          <li className={`${view == 'tweet' ? 'border-[#00acee] border-b border-b-2' : null} p-2`}
            onClick={() => setView('tweet')} >Tweets</li>

          <li className={`${view == 'replies' ? 'border-[#00acee] border-b border-b-2' : null} p-2`}
            onClick={() => setView('replies')}>Replies</li>

          <li className={`${view == 'likes' ? 'border-[#00acee] border-b border-b-2' : null} p-2`}
            onClick={() => setView('likes')}>Likes</li>
        </ul>
      </nav>
      <main className="w-full flex flex-col items-center">
        {view == 'tweet' ? <Tweets /> : view == 'likes' ? <Likes /> : <Replies />}
      </main>
    </div>
  )
}

