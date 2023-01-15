import { useState, useContext } from 'react'

import FlowButton from './button'
import Input from "../../../components/input"
import Cancel from "../../../components/CancelIcon"

import { FlowContext } from '.'
import getUserById from '../../../services/getUserById'
import getUserByUsername from '../../../services/getUserByUsername'


export default function StepOne({ close, next }: {
  close: () => void,
  next: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState({
    year: '2000',
    month: '6',
    day: '2'
  })
  const [error, setError] = useState('')
  const { details, setDetails } = useContext(FlowContext)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.length) {
      setError('Fill in name field')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    if (!email.length) {
      setError('Fill in email field')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!pattern.test(email)) {
      setError('invalid email')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    if (!dob.year || !dob.month || !dob.day) {
      setError('You must provide a birth date')
      return
    }
    let start = name.split(' ').join('')
    let u = await getUserByUsername(start)
    if (u) {
      let n = 1
      while (u) {
        start += '' + n
        u = await getUserByUsername(start)
        n++
      }
    }
    setDetails({ ...details, name, email, dob, username: start })
    next()
  }
  const date = new Date()

  return (
    <div>
      <div className="p-3  pl-5 flex items-center  h-[70px] ">
        <Cancel className="left-[18px]"
          onClick={close} />
        <p className="font-[700] ml-8">Step 1 of 4</p>
      </div>
      <div className=" w-[85vw] ml-auto mr-auto flex flex-col ">
        <h2 className="font-[700] text-[24px] mt-4">
          Create your account
        </h2>
        <form onSubmit={onSubmit}
          className='w-full flex flex-col'>
          {error && <p className='text-[#f008]  absolute'>{error}</p>}
          <Input
            type="name"
            name="Name"
            value={name}
            changeHandler={(e: any) => setName(e.target.value)}
            placeholder='Name'
            className="mt-8"
          />
          <Input
            type="email"
            name="Email"
            value={email}
            changeHandler={(e: any) => setEmail(e.target.value)}
            placeholder='Email'
            className="mt-8"
          />
          <div className="mt-8">
            <h4 className="font-[500] text-[14px] mb-2">Date of birth</h4>
            <p className="text-[#fff6] text-[14px]">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
            <div className='mt-3'>
              <select className='bg-transparent'
                value={dob.year}
                onChange={({ target }) => setDob((prev) => ({ ...prev, year: target.value }))}>
                <Options min={1940} max={date.getFullYear()} />
              </select>
              <select className='bg-transparent' value={dob.month}
                onChange={({ target }) => setDob((prev) => ({ ...prev, month: target.value }))}>
                <Options min={1} max={12} />
              </select>
              <select className='bg-transparent'
                value={dob.day}
                onChange={({ target }) => setDob((prev) => ({ ...prev, day: target.value }))}>
                <Options min={1} max={31} />
              </select>
            </div>
          </div>
          <FlowButton className='date fixed bottom-[15px] left-[50%] translate-x-[-50%] w-[86%]'>
            Next
          </FlowButton>
        </form>
      </div>
    </div>
  )
}

function Options({ min, max }: { min: number, max: number }) {
  const arr: number[] = []
  for (let i = max; i >= min; i--) {
    arr.push(i)
  }
  return (
    <>
      {arr.map((item) => (<option className='bg-black p-3' key={item} value={item}>{item}</option>))}
    </>
  )
}