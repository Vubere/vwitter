import { useContext, useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Sidenav } from '../index'
import Avatar from "../../../components/icon"
import TwitterIcon from "../../../components/twitterLogo"
import PostItem, { PostItem as PItype } from './components/PostItem'
import Icon from '../../../components/icon'

import * as routes from '../../../constants/route'
import avatar from '../../../assets/avatar.jpg'
import tweetIcon from '../../../assets/tweetIcon.png'
import { twitterColor } from '../../../constants/color'
import { UserCon } from '../../../context/UserContext'
import getUserById from '../../../services/getUserById'
import Load from '../../../components/load'

export default function Home() {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)
  
  const context = useContext(UserCon)
  const navigate = useNavigate()
  
  if(context==undefined||context.user==undefined){
    navigate('/login')
    return null
  }
  const [posts, setPosts] = useState<string[]>(context.user.posts)
  const [loading,setLoading] = useState(false)


  useLayoutEffect(()=>{
    if(context.user){
      const arr = context.user.following
      arr.push(context.user.id)
      
    
      let postArr:string[] = [];
      arr.forEach((id)=>{
    
        (async()=>{
          setLoading(true)
          const {posts:p} = await getUserById(id)
        
          p.forEach((v, i)=>{
            postArr.push(v)
            if(i==p.length-1){
              const set = new Set(postArr)
              setPosts(Array.from(set))
            }
          })
          setLoading(false)
        })()
      })
    }
    
  }, [])

  if(loading){
    return <Load/>
  }

  return (
    <main className='overflow-y-auto h-[100vh] w-[100vw] pb-[100px]'>
      <header className="pl-3 pt-1 pb-1 border-b border-[#fff2] flex gap-4 relative min-h-[50px] items-center">
        <Avatar
          width="30px"
          height="30px"
          src={context.user.details.avatar||avatar}
          className='rounded-full left-3 top-4'
          onClick={() => setSidenav(!sidenavOpen)} />
        <h2 className='font-[600] text-[18px]'>Home</h2>
      </header>
      <section className='w-full '>
        {posts.length ? posts.map((item) =>{
          return (
            <PostItem id={item} />
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