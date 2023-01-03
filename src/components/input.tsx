import {useRef} from 'react'

export default function Input({
  type,
  name,
  className,
  value,
  changeHandler,
  inputClassname,
  id,
  placeholder
}:InputType) {
  const inputRef:any = useRef()
  return (
    <label htmlFor={id||type} className={`w-[100%] h-[60px] border pl-2 bg-transparent border-[#fff4] text-[#fff5] rounded-[5px] flex flex-col justify-center ${className}`}>
      {name}
      <input
        id={id||type}
        ref={inputRef}
        name={name}
        type={type}
        onBlur={() => inputRef.current.style.display = 'hidden'}
        className={`h-[20px] w-[98%] placeholder-[#fff5] bg-transparent text-white text-[16px] ${inputClassname}`}
        onChange={changeHandler}
        value={value}
        />
    </label>
  )
}

type InputType = {
  type: string,
  id?: string,
  name: string,
  className?: string,
  value: string,
  changeHandler: (e:any)=>void,
  placeholder: string,
  inputClassname?: string
}