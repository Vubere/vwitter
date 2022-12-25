

export default function Icon({width, height, src, className, onClick}:{
  width: string,
  height: string,
  src: string,
  className?: string,
  onClick?: ()=>void,
}){
  return (
    <div aria-label="profile picture"
    className={className}
    onClick={onClick}
    style={{
      backgroundImage: `url(${src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: `${height}`,
      width: `${width}`
    }}></div>
  )
}

