import Icon from "../../components/icon";
import picture from "../../assets/image.png"
import { useState } from "react";




export default function Input() {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<any>()

  console.log(file)

  return (
    
    <div className="bg-black fixed bottom-0 w-full pb-2">
      <form onSubmit={() => null} className='w-[full]  bg-[#fff2] w-[95%] mr-auto ml-auto  h-[50px] rounded-full flex items-center pl-4 focus:flex-col'>
        <label htmlFor="file">
          <Icon src={picture} width='20px' height='20px' />
          <input type="file" id='file'
            value={file}
            onChange={({ target }) => setFile(target.value)}
            className="absolute left-2 top-[50%] transform translate-y-[-50%] hidden" />
        </label>
        <input
          type='text'
          placeholder="Start a message"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          className="bg-transparent w-[80%] ml-4 placeholder:text-[#fff4]" />
      </form>
    </div>

  )
}