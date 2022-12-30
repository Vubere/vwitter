import { Link, Outlet, useNavigate } from "react-router-dom";
import { lazy, useState } from "react";


import Icon from "../../components/icon";
import avatar from "../../assets/avatar.jpg"
import Back from "../../components/Back";


import * as routes from '../../constants/route'
import { user_details } from "../Dashboard/home/components/PostItem";



export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState<user_details>({
    full_name: 'victor ubere',
    username: 'vubeer',
    avatar: '',
    id: 'ashud'
  })
  const [User, setuser] = useState({
    followers: [''],
    following: ['']
  })
  const [view, setView] = useState<'tweet' | 'replies' | 'likes'>('tweet')
  return (
    <div>
      <header>
        <div className="relative">
          <div className=" absolute left-2 top-2 bg-[#0003] rounded-full p-1">
            <Back click={() => navigate('/home')} className="w-[20px] h-[20px]" />
          </div>
          <Icon src={avatar}
            width="100%" height='120px' />
          <Icon src={avatar}
            width='70px' height='70px' className='rounded-full outline outline-black absolute bottom-[-30px] left-[15px]' />
        </div>
        <Link to={routes.editprofile} className='w-full'>
          <button className="float-right border border-[#fff4]  rounded-full w-[110px] h-[35px] m-2 clear-both">Edit Profile</button>
        </Link>
        <section className="mt-14 pl-3 pr-3 pb-10">
          <p className="font-[700] text-[22px] mb-1 p-0 h-[22px]">{user.full_name}</p>
          <p className="text-[#fff4] m-0 p-0">@{user.username}</p>
          <p className="text-[14px] mt-3">bsufbsa uasuofp phpfoshdfs hspha</p>
          <div className="flex gap-4 mt-4">
            <p className="text-[#fff4]"><span>{User.following.length}</span> Following</p>
            <p className="text-[#fff4]"><span>{User.followers.length}</span> Followers</p>
          </div>
        </section>
      </header>
      <nav>
        <ul className="flex justify-around">
          <Link to='./'>

            <li className={`${view == 'tweet' ? 'border-[#00acee] border-b border-b-2' : null} p-2`}
              onClick={() => setView('tweet')} >Tweets</li>
          </Link>
          <Link to='./replies'>
            <li className={`${view == 'replies' ? 'border-[#00acee] border-b border-b-2' : null} p-2`}
              onClick={() => setView('replies')}>Replies</li>
          </Link>
          <Link to='./likes'>
            <li className={`${view == 'likes' ? 'border-[#00acee] border-b border-b-2' : null} p-2`}
              onClick={() => setView('likes')}>Likes</li>
          </Link>
        </ul>
      </nav>
      <main className="w-full flex flex-col items-center">
        <Outlet />
      </main>
    </div>
  )
}

