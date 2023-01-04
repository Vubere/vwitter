import React, { useState, useContext, useEffect } from 'react'
import Icon from "../../../../components/icon";

import { Sidenav } from '../..';

import avatar from "../../../../assets/avatar.jpg"
import searchImg from "../../../../components/assets/search.png"
import { UserCon } from '../../../../context/UserContext';
import { collection } from 'firebase/firestore';
import { db } from '../../../../main';
import getUserByUsername from '../../../../services/getUserByUsername';

export default function SearchHeader({ search, setSearch, setSearchResult, setLoading }: { search: string, setSearch: (v: string) => void, setSearchResult: (v: any[]) => void, setLoading: (v:boolean)=>void }) {
  const { sidenavOpen, setSidenav } = useContext(Sidenav)
  const context = useContext(UserCon)

  if (!context?.user?.details) {
    return null
  }

  const runSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await getUserByUsername(search)
    setSearchResult([res])
    setLoading(false)
  }


  return (
    <header className="p-4 border-b border-[#fff1] flex gap-6 items-center">
      <Icon
        src={context.user.details.avatar || avatar}
        width='30px'
        height='30px'
        className="rounded-full"
        onClick={() => setSidenav(!sidenavOpen)} />
      <form onSubmit={runSearch}
        className="min-w-210px h-30px relative">
        <input type="search"
          name="search"
          id="search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          autoComplete="no"
          placeholder="Search Vwitter"
          className="bg-[#fff1] h-[30px] rounded-[15px] p-[10px] border-box min-w-[210px] pl-11 text-[14px] placeholder-[#fff4]" />
        <button type='submit' className='absolute left-[15px] top-[50%] transform translate-y-[-50%]'>
          <Icon
            src={searchImg}
            width="17px"
            height="17px"
            className="" />
        </button>
      </form>
    </header>
  )
}