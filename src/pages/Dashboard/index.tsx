import { lazy, createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Layout from "./DashboardLayout";
import * as routes from '../../constants/route'

export const Sidenav = createContext<any>(undefined)


export default function Dashboard() {
  const [sidenavOpen, setSidenav] = useState(false)


  return (
    <Sidenav.Provider value={{sidenavOpen, setSidenav}}>
      <Layout>
        <Outlet />
      </Layout>
    </Sidenav.Provider>
  )
}