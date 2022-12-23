


export default function Container({children}:{children:React.ReactNode}) {
  return(
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      {children}
    </div>
  )
}