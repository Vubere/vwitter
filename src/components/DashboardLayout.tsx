import Sidenav from "./sidenav"
import Navbar from "./navbar"


export default function Layout({children}:{children:React.ReactNode}){
  return(
    <div>
      <Sidenav/>
      {children}
      <Navbar/>
    </div>
  )
}