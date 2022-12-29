import { useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom'

import Back from "../../../components/Back";
import Icon from '../../../components/icon';

import avatar from '../../../assets/avatar.jpg'
import image from '../../../assets/image.png'

export default function SendPost(){
  const [post, setPost] = useState('')
  const [file, setFile] = useState<any>()
  const navigate = useNavigate()
  const input_ref:any = useRef()

  useEffect(()=>{
    input_ref.current.focus()
  },[])

  return(
    <section className='relative w-full flex gap-3 pt-[50px] p-3'>
        <Back
        className="w-[20px] h-[20px] absolute top-2 left-3"
        click={()=>navigate('/home')}/>
        <Icon width='50px' height='50px' src={avatar} className='rounded-full min-w-[50px]'/>
        <form onSubmit={()=>null} className='w-[95%] h-[150px]'>

          <textarea name="post" id="post"
          value={post} onChange={({target})=>setPost(target.value)}
          ref={input_ref} className='resize-none border-b border-[#fff2] bg-transparent placeholder:text-[#fff4] w-[90%] h-[100px]' placeholder="What's happening?"></textarea>
        <button className='bg-[#447cef] w-[80px] h-[30px] rounded-full absolute top-2 right-3 '>
            Tweet
          </button>
          <label htmlFor="file" className='pt-3  block'>
            <Icon width='20px' height='20px' src={image}/>
            <input type="file" name="file" id="file" className='hidden' 
            value={file} onChange={({target})=>setFile(target.files)}/>
          </label>
        </form>
    </section>
  )
}