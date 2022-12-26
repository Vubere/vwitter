import { useState } from 'react'
import { user_details } from '../home/components/PostItem'


import SearchHeader from "./header"
import SearchResult from "./searchResult"

export default function Search() {
  const [result, setSearchResult] = useState<user_details[] | string|undefined>()
  const [search, setSearch] = useState('')

  return (
    <section>
      <SearchHeader  search={search} setSearch={setSearch}/>
      {
        result!=undefined?
      <SearchResult result={result} search={search} />:
      <p className='p-3 text-[#fff6] text-[14px]'>Try searching for a user...</p>
      }
    </section>
  )
}