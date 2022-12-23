import close from '../assets/close.png'


export default function Cancel({className, click}:{className?:string, click:()=>void}) {
  return(
    <div
      className={`w-[25px] h-[25px] bg-white rounded-full ${className}`}
      onClick={click}
      style={{
        backgroundImage: `url(${close})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }}></div>
  )
}