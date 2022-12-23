

export default function flowButton({ children, click }: { children: React.ReactNode, click?:()=>void }) {
  return (
    <button type="submit" className="h-[60px] w-[85vw] bg-[#fff6] m-auto fixed bottom-[15px] rounded-[30px] text-[#000] font-[700] text-[18px]"
    onClick={click}>
      {children}
    </button>
  )
}