import {useState} from 'react'
import { Link } from "react-router-dom"


import Container from "../../components/container"
import Modal from '../../components/Modal'
import SignupFlow from './signupFlow'

import google from "../../assets/search.png"

export default function Signup() {
  const [signupModal, setSignUpModal] = useState(false)


  return (
    <Container>
      <div className="flex flex-col items-center">

        <h2 className="w-[80vw] font-[700] text-white text-[24px] mb-6">Join Vwitter today</h2>
        <ul>
          <Options >
            <img src={google} alt="google icon" 
            className="w-[20px] h-[20px] m-[8px]"/>
            Sign up with Google
          </Options>
          <div className="relative m-4 h-[10px] flex flex-row items-center justify-around">
            <hr className="w-[42%] border-[#fff4]" />
            <div className="bg-black text-white text-center">or</div>
            <hr className="w-[42%] border-[#fff4]"/>
          </div>
          <Options click={()=>setSignUpModal(true)}>
            Sign up with email
          </Options>
        </ul>
        <p className="text-[#fff4] text-[12px] w-[80vw] mt-1">By signing up you agree to be peaceful in this app.</p>

        <div className="w-[80vw] ">
          <p className="text-white mt-8 text-[14px]">Have an account already? {' '}
            <Link to='/login' className="text-[#00acee]">Log in</Link>
          </p>
        </div>
        {signupModal&&<Modal>
          <SignupFlow close={()=>setSignUpModal(false)}/>
          </Modal>}
      </div>
    </Container>
  )
}

function Options ({children, className, click}:{children: React.ReactNode, className?:string, click?:()=>void}) {
  return (
    <li className={`bg-white m-2 p-2  w-[80vw] h-[42px] rounded-[30px] text-black text-center font-[700] flex items-center justify-center ${className} `}
    onClick={click}>
      {children}
    </li>
  )
}