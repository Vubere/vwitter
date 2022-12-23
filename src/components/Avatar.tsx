

export default function Avatar({width, height, src, className}:{
  width: string,
  height: string,
  src: string,
  className?: string,
}){
  return (
    <div aria-label="profile picture"
    className={className}
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

