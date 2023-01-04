import Icon from './icon'

import load from './assets/load.png'

export default function Load({h='100vh'}:{h?:string}){
  return(
    <div className={`w-[100%] h-[${h}] flex items-center justify-center`}>
      <Icon src={load} width='30px' height='30px'
      className='transform rotate-[360deg] duration-500 '/>
    </div>
  )
}