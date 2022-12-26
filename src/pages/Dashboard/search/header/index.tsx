import { useState } from 'react'
import Icon from "../../../../components/icon";


import avatar from "../../../../assets/avatar.jpg"
import searchImg from "../../../../components/assets/search.png"

export default function SearchHeader({search, setSearch}:{search:string, setSearch:(v:string)=>void}){
  

 return  (
  <header className="p-4 border-b border-[#fff1] flex gap-6 items-center">
    <Icon
    src={avatar}
    width='30px'
    height='30px'
    className="rounded-full"/>
    <form onSubmit={()=>null}
    className="min-w-210px h-30px relative">
      <input type="search"
      name="search"
      id="search"
      value={search}
      onChange={({target})=>setSearch(target.value)}
      autoComplete="no"
      placeholder="Search Vwitter"
      className="bg-[#fff1] h-[30px] rounded-[15px] p-[10px] border-box min-w-[210px] pl-11 text-[14px] placeholder-[#fff4]" />
      <Icon
      src={searchImg}
      width="17px"
      height="17px"
      className="absolute left-[15px] top-[50%] transform translate-y-[-50%]"/>
    </form>
  </header>
 )
}