import { useContext } from 'react'

import Sidenav from "../../components/sidenav"
import Navbar from "../../components/navbar"

import { Sidenav as SN_context } from "."
import { useNavigate } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {

  const navigate = useNavigate()
  const snCon = useContext(SN_context)
  if(!snCon){
    navigate('/login')
    return null
  }
  
  return (
    <div className='w-full max-w-[520px]'>
      <Sidenav snO={snCon.sidenavOpen} sSN={snCon.setSidenav} />
      {children}
      <Navbar />
    </div>
  )
}