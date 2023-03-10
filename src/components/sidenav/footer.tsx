import { getAuth, signOut } from 'firebase/auth'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import logoutIcon from '../../assets/logout.png'
import { UserCon } from '../../context/UserContext'

export default function SN_footer() {

  const auth = getAuth()
  const userContext = useContext(UserCon)
  const navigate = useNavigate()

  const logout = async() => {
    await signOut(auth)
    localStorage.removeItem('user')
    userContext?.setUser(undefined)
    navigate('/login')
  }

  return (
    <div className='border-t w-[90%] border-[#fff4] mr-auto ml-auto p-4 mt-auto absolute bottom-5'>
      <p className='text-[14px] flex ' onClick={logout}>
        <span
          className='w-[20px] h-[20px] mr-3 block'
          aria-label='logout icon'
          style={{
            backgroundImage: `url(${logoutIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}></span>
        logout
      </p>
    </div>
  )
}