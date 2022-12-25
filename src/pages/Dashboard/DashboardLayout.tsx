import {useContext} from 'react'

import Sidenav from "../../components/sidenav"
import Navbar from "../../components/navbar"

import { Sidenav as SN_context } from "."

export default function Layout({children}:{children:React.ReactNode}){
  const {sidenavOpen, setSidenav} = useContext(SN_context)
  return(
    <div>
      <Sidenav  snO={sidenavOpen} sSN={setSidenav}/>
      {children}
      <Navbar/>
    </div>
  )
}