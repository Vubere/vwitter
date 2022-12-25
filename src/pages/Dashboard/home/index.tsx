import {useContext, useState} from 'react'

import Avatar from "../../../components/icon"
import TwitterIcon from "../../../components/twitterLogo"
import PostItem, { PostItem as PItype } from './components/PostItem'

import avatar from '../../../assets/avatar.jpg'

import {Sidenav} from '../index'

export default function Home() {
  const {sidenavOpen, setSidenav} = useContext(Sidenav)

  const [posts, setPosts] = useState<PItype[]>([{
    comments:[{
      comment: 'aum',
      likes: [''],
      commentOwner: {
        avatar: '',
        username: 'victorubere',
        full_name: 'Victor Ubere'
      }
    }],
    post_owner: {
      avatar: '',
      username: 'victorubere',
      full_name: 'Victor Ubere'
    },
    photoUrl: avatar,
    likes: [''],
    caption: 'this is a test data',
    date: '20m'
  }])

  return (
    <main>
      <header className="p-3 border-b border-[#fff2] flex justify-center relative">
        <Avatar
          width="30px"
          height="30px"
          src={avatar}
          className='rounded-full absolute left-3 top-4' 
          onClick={()=>setSidenav(!sidenavOpen)}/>
        <TwitterIcon />
      </header>
      <section className='w-full '>
        {posts.map((item)=><PostItem details={item}/>)}
      </section>
    </main>
  )
}