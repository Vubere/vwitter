

export default function Error({message, className}:{message:string, className?:string}){
  return(
    <p className={`text-red text-[12px] ${className}`}>
      {message}
    </p>
  )
}