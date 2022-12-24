import { useContext } from 'react'

import Back from "../../../components/Back"
import FlowButton from "./button"

import check from "../../../assets/checkmark.png"

import { FlowContext } from '.'

export default function stepThree({ next, prev }: {
  next: () => void,
  prev: () => void
}) {
  const { details } = useContext(FlowContext)


  return (
    <div>
      <div className="flex items-center m-3">
        <Back className="w-[40px] h-[20px] m-3" click={prev} />
        <p> Step 3 of 4</p>
      </div>
      <div className="flex flex-col items-center">
        <h3 className='w-[90%] ml-auto mr-auto mt-8 font-[700] text-[22px]'>Confirm details</h3>
        <p className="w-[90%] h-[60px] border pl-2 bg-transparent border-[#fff4] text-[#fff] rounded-[5px] flex flex-col justify-center mt-5">
          {details.name}
          <img src={check} alt=''
            width='20px' height='20px' className='absolute right-[30px]' />
        </p>
        <p className="w-[90%] h-[60px] border pl-2 bg-transparent border-[#fff4] text-[#fff] rounded-[5px] flex flex-col justify-center mt-5">
          {details.email}
          <img src={check} alt=''
            width='20px' height='20px' className='absolute right-[30px]' />
        </p>
        <p className="w-[90%] h-[60px] border pl-2 bg-transparent border-[#fff4] text-[#fff] rounded-[5px] flex flex-col justify-center mt-5">
          {details.dob}
          <img src={check} alt=''
            width='20px' height='20px' className='absolute right-[30px]' />
        </p>
        <FlowButton click={next} className='fixed bottom-[15px]'>
          Next
        </FlowButton>
      </div>
    </div>
  )
}