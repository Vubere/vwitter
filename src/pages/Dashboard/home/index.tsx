import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Sidenav } from '../index'
import Avatar from "../../../components/icon"

import PostItem, { postType } from '../../../components/PostItem'
import Icon from '../../../components/icon'

import * as routes from '../../../constants/route'
import avatar from '../../../assets/avatar.jpg'
import tweetIcon from '../../../assets/tweetIcon.png'

import { UserCon } from '../../../context/UserContext'
import getUserById from '../../../services/getUserById'
import Load from '../../../components/load'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../main'
import { notifications } from '../Notification'

export default function Home() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)

  const context = useContext(UserCon)


  const [posts, setPosts] = useState<postType[]>([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (context?.user) {
      const arr = [...context.user.following, context.user.id]


      let postArr: postType[] = [];
      arr.forEach((id, i) => {
        const docRef = doc(db, 'users', id);
        (async () => {
          setLoading(true)
          const { posts: p } = await getUserById(id)
          const t: postType[] = []

          p.forEach((v, i) => {
            postArr.push(v)
            if (i == p.length - 1) {
              postArr.push(v)
            }
          })
          if (i == arr.length - 1) {
            setPosts(postArr)
          }
          setLoading(false)
        })()
      })
    }
  }, [context])

  if (context == undefined || context.user == undefined) {
    return null
  }

  if (loading) {
    return <Load />
  }

  return (
    <main className='overflow-y-auto h-[100vh] w-full pb-[100px] pt-[55px]'>
      <header className="pl-3 pt-1 pb-1 border-b border-[#fff2] flex gap-4 fixed top-0 min-h-[50px] items-center bg-black w-full">
        <Avatar
          width="30px"
          height="30px"
          src={context.user.details.avatar || avatar}
          className='rounded-full left-3 top-4'
          onClick={() => setSidenav(!sidenavOpen)} />
        <h2 className='font-[600] text-[18px]'>Home</h2>
      </header>
      <section className='w-full '>
        {posts.length ? posts.sort((a,b)=> a.time-b.time).map((item) => {
          return (
            <PostItem id={item.id} key={item.id} type={item.type} retweeter={item?.retweeter} time={item.time}/>
          )
        }
        ) : <p className='text-[#fff6] m-3 text-[14px]'>Follow users to see feed content...
          <Link to={routes.users} className='m-2 bg-[#00acee] block border w-[120px] font-[600] text-[16px] text-white text-center p-2 rounded-full border-[#fff1]'>See Users</Link></p>}
      </section>
      <Link to={routes.compose} className='absolute bottom-[70px] right-[10px]'>
        <button className={`block w-[55px] h-[55px] rounded-full bg-[#447cef] z-20 flex items-center justify-center`}>
          <Icon width='30px' height='30px' className='' src={tweetIcon} />
        </button>
      </Link>
    </main>
  )
}