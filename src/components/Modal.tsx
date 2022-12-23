import { createPortal } from "react-dom"

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    createPortal(<div className = "w-[100vw] h-[100vh] z-[10008] absolute top-[0] left-[0] bg-black" > {children}</div>, document.getElementById('modal') as HTMLElement)
  )
}