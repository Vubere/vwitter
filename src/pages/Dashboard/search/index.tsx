import { useState } from 'react'
import Load from '../../../components/load'
import { user_info } from '../../../context/UserContext'


import SearchHeader from "./header"
import SearchResult from "./searchResult"

export default function Search() {
  const [result, setSearchResult] = useState<user_info[] | undefined>()
  const [search, setSearch] = useState('')
  const [loading,setLoading] = useState(false)

  return (
    <section>
      <SearchHeader  search={search} setSearch={setSearch} setSearchResult={setSearchResult} setLoading={setLoading}/>
      {
        result!=undefined&&result.length?
        loading?<Load/>:
      <SearchResult result={result} search={search} />:
      <p className='p-3 text-[#fff6] text-[14px]'>Try searching for a user...</p>
      }
    </section>
  )
}