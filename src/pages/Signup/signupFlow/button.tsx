

export default function flowButton({ children, click, className }: { children: React.ReactNode, click?:()=>void, className?:string }) {
  return (
    <button type="submit" className={`h-[60px] min-w-[270px] bg-[#fff6] m-auto  rounded-[30px] text-[#000] font-[700] text-[18px] ${className}`}
    onClick={click}>
      {children}
    </button>
  )
}