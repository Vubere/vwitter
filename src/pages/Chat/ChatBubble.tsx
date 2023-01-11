import { singleChat } from ".";
import Icon from "../../components/icon";
import avatar from '../../assets/avatar.jpg'
import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export default function ChatBubble({ details, className, refM}: { details: singleChat, className: 'left' | 'right', refM:React.MutableRefObject<HTMLDivElement>|undefined}) {

  useEffect(()=>{
    if(refM?.current){
      refM.current.scrollIntoView(true)
    }
  },[])
  return (
    <div className={`float-${className} clear-both max-w-[80%] mb-2`} ref={refM}>
      <div className={`inline flex flex-col ml-4 mr-4 rounded-[20px] ${className == 'left' ? 'rounded-bl-[3px]' : 'rounded-br-[2px]'} bg-[${className == 'left' ? '#fff4' : '#00acee'}] p-3 text-wrap `}>
        <div>
          <p className="w-[100%] break-all">{details.text}</p>
        </div>
        {details.photoUrl&&
          <div className="max-w-400px flex justify-center align-center ">
          <img src={details.photoUrl} alt="document" className="w-full rounded-[10px] min-h-[200px]"/>
        </div>
        }
      </div>
      <p className={`ml-4 mr-4 mt-0 float-${className} text-[#fff3] text-[13px]`}>{formatDistanceToNow(details.time)}</p>
    </div>
  )
}