import Icon from "../icon";
import vMenu from '../assets/v-menu.png'
import { useState } from "react";


export default function VerticalMenu({className, text, click}:{className:string, text:string, click:any}){
  const [popup, setPopup] = useState(false)


  return (
    <div className="relative">
      {popup&&<div className={`absolute top-[-25px] bg-[#fff6] ${className} w-[200px] pl-4 rounded-full text-black right-0`} onClick={click}>{text}</div>}
      <Icon
      width="10px"
      height="25px"
      src={vMenu}
      onClick={()=>setPopup(!popup)}/>
    </div>
  )
}