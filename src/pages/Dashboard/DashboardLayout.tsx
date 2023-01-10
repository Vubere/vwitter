import { useContext } from 'react'

import Sidenav from "../../components/sidenav"
import Navbar from "../../components/navbar"

import { Sidenav as SN_context } from "."

export default function Layout({ children }: { children: React.ReactNode }) {
  const snCon = useContext(SN_context)
  if(!snCon){
    return null
  }
  
  return (
    <div>
      <Sidenav snO={snCon.sidenavOpen} sSN={snCon.setSidenav} />
      {children}
      <Navbar />
    </div>
  )
}