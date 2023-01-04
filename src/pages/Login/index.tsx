import { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom"

import Cancel from "../../components/CancelIcon";
import TwitterIcon from "../../components/twitterLogo";
import { Options } from "../Signup";
import FlowButton from '../Signup/signupFlow/button';
import Input from "../../components/input";
import Modal from '../../components/Modal';

import google from '../../assets/google.png'
import check from '../../assets/checkmark.png'

import * as routes from '../../constants/route'
import { twitterColor } from '../../constants/color';
import { signInWithEmailAndPassword, getAuth, setPersistence } from 'firebase/auth';
import { UserCon } from '../../context/UserContext';
import getUserByUsername from '../../services/getUserByUsername';
import getUserById from '../../services/getUserById';
import Load from '../../components/load';

export default function Login() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [loginModal, setLoginModal] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()
  const userContext = useContext(UserCon)
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const onSubmit = () => {

    (async () => {

      if (!email.length) {
        setError('email field is empty')
        return
      }
      if (!pwd.length) {
        setError('must input a password')
        return
      }

      if (userContext) {
        setLoading(true)
        const h = await signInWithEmailAndPassword(auth, email, pwd)

        if (h) {
          setLoginModal(false)
          
          const details = await getUserById(h.user.uid)
          navigate('/home')
          userContext.setUser(details)

        }
        setLoading(false)
      }
    })()

  }
  if(loading){
    return <Load/>
  }

  return (
    <div className="flex flex-col items-center">
      <header className="relative flex justify-center w-full p-3">
        <TwitterIcon />
      </header>
      <div className='flex flex-col justify-center h-[80vh]'>
        <h2 className="w-[80vw] font-[700] text-white text-[24px] mb-6">Sign in to Vwitter</h2>
        <ul>
          <Options >
            <img src={google} alt="google icon"
              className="w-[20px] h-[20px] m-[8px]" />
            Sign in with Google
          </Options>
          <div className="relative m-4 h-[10px] flex flex-row items-center justify-around">
            <hr className="w-[42%] border-[#fff4]" />
            <div className="bg-black text-white text-center">or</div>
            <hr className="w-[42%] border-[#fff4]" />
          </div>
          <form onSubmit={e => {
            e.preventDefault()
            setLoginModal(true)
          }
          } className='w-[95%] mr-auto ml-auto flex flex-col items-center'>
            <Input
              type="email"
              name="Email"
              placeholder=''
              value={email}
              changeHandler={e => setEmail(e.target.value)} />
            <FlowButton className='relative mt-5 w-[98%] h-[40px]'>
              Next
            </FlowButton>
          </form>
        </ul>
        <div className='w-[88%] mb-6 p-3'>
          <p className='inline text-[14px] text-[#fff8]'>Don't have an account?</p>{' '}
          <Link to={routes.signup}
            className={`text-[${twitterColor}] text-[14px]`}>Sign up</Link>
        </div>
      </div>
      {loginModal && (
        <Modal>
          <div>
            <header className="relative flex justify-center w-full p-3">
              <Cancel onClick={() => setLoginModal(false)}
                className="absolute left-[18px] top-[18px] z-[8987283]" />
              <TwitterIcon />
            </header>
          </div>

          <h3 className='w-[90%] mdr-auto ml-auto font-[700] text-[24px]'>Enter your password</h3>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col items-center">
            <p className="w-[90%] h-[60px] border pl-2 bg-transparent border-[#fff4] text-[#fff] rounded-[5px] flex flex-col justify-center mt-5 relative">
              <span className='text-[#fff8] text-[12px]'>Email</span>
              <span className='text-[#fff5] text-[14px]'>{email}</span>
              <img src={check} alt=''
                width='20px' height='20px' className='absolute right-[20px]' />
            </p>
            <Input
              type='password'
              name='password'
              placeholder=''
              className='w-[90%] mt-6 '
              value={pwd}
              changeHandler={({ target }) => setPwd(target.value)}
            />
            <p className='w-[90%] text-[12px] text-[#00acee] mt-1'>forgot password?</p>
          </form>
          <div className='fixed bottom-0 h-[150px] w-full flex flex-col items-center justify-center'>

            <FlowButton className='w-[90%]' click={onSubmit}>
              Log in
            </FlowButton>
          </div>
        </Modal>)}
    </div>
  )
}