

export default function Icon({width, height, src, className, onClick, ref}:{
  width: string,
  height: string,
  src: string,
  className?: string,
  onClick?: ()=>void,
  ref?: any
}){
  return (
    <span aria-label="profile picture"
    className={className+' block'}
    onClick={onClick}
    ref={ref}
    style={{
      backgroundImage: `url(${src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: `${height}`,
      width: `${width}`
    }}></span>
  )
}

