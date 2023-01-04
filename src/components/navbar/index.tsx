import { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import home from '../assets/home.png'
import homeFilled from '../assets/homeFilled.png'
import search from '../assets/search.png'
import searchFilled from '../assets/searchFilled.png'
import notif from '../assets/notif.png'
import notifFilled from '../assets/notifFilled.png'
import mail from '../assets/mail.png'
import mailFilled from '../assets/mailFilled.png'

import * as routes from '../../constants/route'

export default function Navbar() {
  const [currentTab, setCurrentTab] = useState('home')

  useLayoutEffect(()=>{
    const pathname = window.location.pathname
    if(pathname){
      setCurrentTab(pathname.slice(1, pathname.length))
    }
  }, [])



  return (
    <nav className="fixed mt-auto flex justify-center items-center bottom-0 w-[100%] h-[50px] z-20 border-t border-[#fff4] bg-black">
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
          <Link to={routes.notifications}>

            <div
              className='w-[25px] h-[25px]'
              style={{
                backgroundImage: `url(${currentTab == 'notifications' ? notifFilled : notif})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></div>
          </Link>
        </li>
        <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'
          onClick={() => setCurrentTab('messages')} >
          <Link to={routes.messages}>

            <div
              className='w-[25px] h-[25px]'
              style={{
                backgroundImage: `url(${currentTab == 'messages' ? mailFilled : mail})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></div>
          </Link>
        </li>

      </ul>
    </nav>
  )
}