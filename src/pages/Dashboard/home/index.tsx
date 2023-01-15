import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Sidenav } from '../index'
import Avatar from "../../../components/icon"

import PostItem, { postType } from '../../../components/PostItem'
import Icon from '../../../components/icon'

import * as routes from '../../../constants/route'
import avatar from '../../../assets/avatar.jpg'
import tweetIcon from '../../../assets/tweetIcon.png'

import { UserCon, user_info } from '../../../context/UserContext'
import getUserById from '../../../services/getUserById'
import Load from '../../../components/load'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../main'

import { FeedContext } from '../../../context/feedContext'

import { getAuth } from 'firebase/auth'

export default function Home() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)

  const context = useContext(UserCon)


  const [posts, setPosts] = useState<postType[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const feedContext = useContext(FeedContext)
  const { currentUser } = getAuth()


  useEffect(() => {
    if (currentUser) {
      if (feedContext) {
        if (feedContext.feedList) {
          setPosts(feedContext.feedList)
        }
      };
      (async () => {
        try {
          setLoading(true)
          const cu = await getUserById(currentUser.uid)
          if (cu) {

            const arr = cu.following
            
            
            let postArr: postType[] = [...cu.posts];

            cu.following.forEach((id, i) => {
              (async () => {
                const u = await getUserById(id)
                if (u) {
                  postArr.push(...u.posts)
                }
                console.log(id)
                if (i == arr.length - 1) {
                  console.log(postArr)
                  setPosts(postArr)
                  if (feedContext) {

                    feedContext.setFeedList(postArr)
                  }

                }
              })()
            })
          } else {
            setPosts([])
          }
          setLoading(false)
        } catch (err) {
        }
      })()
    }
  }, [context])

  if (context == undefined || context.user == undefined) {
    return null
  }

  if (loading || posts == undefined) {
    return <Load />
  }

  return (
    <main className='overflow-y-auto h-[100vh] w-full pb-[100px] pt-[55px]'>
      <header className="pl-3 pt-1 pb-1 border-b border-[#fff2] flex gap-4 fixed top-0 min-h-[50px] items-center bg-black w-full bg-black z-[99]">
        <Avatar
          width="30px"
          height="30px"
          src={context.user.details.avatar || avatar}
          className='rounded-full left-3 top-4'
          onClick={() => setSidenav(!sidenavOpen)} />
        <h2 className='font-[600] text-[18px]'>Home</h2>
      </header>
      <section className='w-full '>
        {posts.length ? posts.sort((a, b) => b.time - a.time).map((item) => {
          return (
            <PostItem id={item.id} key={item.id} type={item.type} retweeter={item?.retweeter} time={item.time} />
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