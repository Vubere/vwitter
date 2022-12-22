


export default function Container({children}:{children:React.ReactNode}) {
  return(
    <div className="container flex items-center justify-center">
      {children}
    </div>
  )
}