import close from '../assets/close.png'


export default function Cancel({className, onClick}:{className?:string, onClick:()=>void}) {
  console.log(onClick)
  return(
    <div
      className={`w-[25px] h-[25px] bg-white rounded-full ${className} z-[10000000] block`}
      onClick={onClick}
      style={{
        backgroundImage: `url(${close})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}></div>
  )
}