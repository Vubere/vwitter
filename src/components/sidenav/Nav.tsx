import profile from '../../assets/profile.png'
import todo from '../../assets/to-do.png'
import people from '../../assets/people.png'
import { Link } from 'react-router-dom'

import * as routes from '../../constants/route'
import { useContext } from 'react'
import { UserCon } from '../../context/UserContext'

export default function SN_Nav() {

  const user = useContext(UserCon)

  if(user?.user==undefined){
    return null
  } 
  return (
    <nav className='w-[100%]'>
      <ul className="w-full p-4">
        <Link to={routes.profile+'/'+user.user.details.username}>
          <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'>
            <div
              className='w-[25px] h-[25px]'
              style={{
                backgroundImage: `url(${profile})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></div>
            Profile
          </li>
        </Link>
        <Link to={routes.todo}>
          <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'>
            <div
              className='w-[25px] h-[25px]'
              style={{
                backgroundImage: `url(${todo})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></div>
            Todo
          </li>
        </Link>
        <Link to={routes.users}>
          <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'>
            <div
              className='w-[25px] h-[25px]'
              style={{
                backgroundImage: `url(${people})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></div>
            Users
          </li>
        </Link>
      </ul>
    </nav >
  )
}