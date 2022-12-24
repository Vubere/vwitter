import SN_Header from "./header"
import SN_Nav from "./Nav"


export default function Sidenav() {
  return (
    <section className="w-[80vw] h-[100vh] shadow-[0_0_2px_0_rgba(200,200,200,0.2)]">
      <SN_Header/>
      <SN_Nav/>
    </section>
  )
}