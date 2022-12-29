import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Sidenav } from '../index'
import Avatar from "../../../components/icon"
import TwitterIcon from "../../../components/twitterLogo"
import PostItem, { PostItem as PItype } from './components/PostItem'
import Icon from '../../../components/icon'

import * as routes from '../../../constants/route'
import avatar from '../../../assets/avatar.jpg'
import tweetIcon from '../../../assets/tweetIcon.png'
import { twitterColor } from '../../../constants/color'

export default function Home() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)

  const [posts, setPosts] = useState<PItype[]>([{
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
  ])

  return (
    <main className='overflow-y-auto h-[100vh] w-[100vw] pb-[100px]'>
      <header className="pl-3 pt-1 pb-1 border-b border-[#fff2] flex gap-4 relative min-h-[50px] items-center">
        <Avatar
          width="30px"
          height="30px"
          src={avatar}
          className='rounded-full left-3 top-4'
          onClick={() => setSidenav(!sidenavOpen)} />
        <h2 className='font-[600] text-[18px]'>Home</h2>
      </header>
      <section className='w-full '>
        {posts.length ? posts.map((item) =>
          <Link to={routes.postpage}>
            <PostItem details={item} />
          </Link>
        ) : <p className='text-[#fff6] m-3 text-[14px]'>Follow users to see feed content...</p>}
      </section>
      <Link to={routes.compose} className='absolute bottom-[70px] right-[10px]'>
        <button className={`block w-[55px] h-[55px] rounded-full bg-[#447cef] z-20 flex items-center justify-center`}>
          <Icon width='30px' height='30px' className='' src={tweetIcon} />
        </button>
      </Link>
    </main>
  )
}