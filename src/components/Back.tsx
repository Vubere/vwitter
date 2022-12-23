import back from '../assets/back.png'

export default function Back ({className, click}:{className:string, click:()=>void}) {
  return (
    <div className={`${className}`}
    onClick={click}
    style={{
      backgroundImage: `url(${back})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain'
    }}></div>
  )
}