import Cancel from "../CancelIcon"
import SN_footer from "./footer"
import SN_Header from "./header"
import SN_Nav from "./Nav"

import style from './sidenav.module.css'

export default function Sidenav({snO, sSN}:{snO:boolean, sSN:(p:boolean)=>void}) {
  return (
    snO?
    <div className="w-full bg-[#fff2] z-[999999]"
    onClick={()=>sSN(false)}>
      <section className={`z-50 h-[100vh] shadow-[0_0_2px_0_rgba(200,200,200,0.2)] relative flex flex-col items-center bg-black ${style.animation}`}
      onClick={e=>e.stopPropagation()}>
        <Cancel
        onClick={()=>sSN(false)}
        className="absolute right-4 top-6"/>
        <SN_Header />
        <SN_Nav />
        <SN_footer />
      </section>
    </div>:null
  )
}