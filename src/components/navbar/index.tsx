import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import home from '../assets/home.png'
import homeFilled from '../assets/homeFilled.png'
import search from '../assets/search.png'
import searchFilled from '../assets/searchFilled.png'
import notif from '../assets/notif.png'
import notifFilled from '../assets/notifFilled.png'
import mail from '../assets/mail.png'
import mailFilled from '../assets/mailFilled.png'

import * as routes from '../../constants/route'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../main'
import { UserCon, user_info } from '../../context/UserContext'
import { getAuth } from 'firebase/auth'

export default function Navbar() {
  const [currentTab, setCurrentTab] = useState('home')
  const navigate = useNavigate()
  const user = useContext(UserCon)
  const [un, setUn] = useState(0)
  const [um, setUm] = useState(0)


  useEffect(()=>{
    const pathname = window.location.pathname
   
    if(pathname.length>1){
      setCurrentTab(pathname.slice(1, pathname.length))
    }else{
      setCurrentTab('home')
      navigate('/home')
    }
  }, [])

  useEffect(()=>{
    
    if(user?.user){
    
      const ref = doc(db, 'users', user.user.details.id)
      onSnapshot(ref, (doc)=>{
        const res = doc.data() as user_info|undefined
        if(res){
          if(um!=res.unread_messages){
            setUm(res.unread_messages)
          }
          if(un!= res.unread_notifications){
            setUn(res.unread_notifications)
          }
        }
      })
    }
  }, [user?.user])



  return (
    <nav className="fixed mt-auto flex justify-center items-center bottom-0 w-full max-w-[520px] h-[50px] z-20 border-t border-[#fff4] bg-black">
      <ul className='flex justify-around align-center w-full mt-4'>

        <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'
          onClick={() => setCurrentTab('home')} >
          <Link to={routes.home}>

            <div
              className='w-[25px] h-[25px]'
              style={{
                backgroundImage: `url(${currentTab == 'home' ? homeFilled : home})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></div>
          </Link>
        </li>
        <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'
          onClick={() => setCurrentTab('search')}>
          <Link to={routes.search}>

            <div
              className='w-[25px] h-[25px]'
              style={{
                backgroundImage: `url(${currentTab == 'search' ? searchFilled : search})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></div>
          </Link>
        </li>
        <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'
          onClick={() => setCurrentTab('notifications')} >
          <Link to={routes.notifications} className='relative'>

            <div
              className='w-[25px] h-[25px]'
              style={{
                backgroundImage: `url(${currentTab == 'notifications' ? notifFilled : notif})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></div>
              {!!un?(<div className='absolute text-[8px] bg-[#00acee] top-[-2px] right-[-1px] rounded-full p-[2px]'>{un}</div>): null
              }
          </Link>
        </li>
        <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'
          onClick={() => setCurrentTab('messages')} >
          <Link to={routes.messages} className='relative'>

            <div
              className='w-[25px] h-[25px]'
              style={{
                backgroundImage: `url(${currentTab == 'messages' ? mailFilled : mail})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></div>
              { !!um?(<div className='absolute text-[8px] bg-[#00acee] top-[-2px] right-[-1px] rounded-full p-[2px]'>{um}</div>): null
              }
          </Link>
        </li>

      </ul>
    </nav>
  )
}