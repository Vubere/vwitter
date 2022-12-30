import { Link } from "react-router-dom";
import Icon from "../../../components/icon";

import * as routes from '../../../constants/route'
import { message } from ".";

import avatar from "../../../assets/avatar.jpg"


export default function MessageDisplay({ item }: { item: message }) {
  return (
    <div className="flex gap-2  pb-6 w-[100%]">
      <Icon
        width="43px"
        height="43px"
        src={avatar}
        className="rounded-full" />
      <div className="h-[38px] flex flex-col gap-1 ">
        <Link to={routes.chat+ '/' +
        item.id}>
          <div className="flex h-[14px] gap-2">
            <div className="flex h-[16px] gap-[7px]">
              <p className="font-[600] text-[14px]">{item.user_details.full_name}</p>
              <p className="text-[#fff6] text-[14px]">@{item.user_details.username.slice(0, 20)}</p>
            </div>
            <span className="flex items-center h-[14px] justify-center font-[700] text-[#fff6]">.</span>
            <p className="text-[14px] text-[#fff6]">{item.date}</p>
          </div>
          <div className="h-[14px] text-[#fff6] text-14px">
            {item.text.length > 15 ? item.text.slice(0, 15) + '...' : item.text}
          </div>
        </Link>
      </div>
    </div>
  )
}

