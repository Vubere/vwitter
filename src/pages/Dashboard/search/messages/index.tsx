import {useState} from 'react'
import Icon from '../../../../components/icon'

import avatar from '../../../../assets/avatar.jpg'
import searchImg from '../../../../components/assets/search.png'

export default function Messages(){
  const [messages, setMessages] = useState([])

  return(
    <section>
      <header>
        <Icon
        src={avatar}
        width='30px'
        height='30px'/>
        <h2>Messages</h2>
      </header>
      <main>
        <form onSubmit={()=>null} className="relative">
          <input type="text" />
          <button><Icon width='14px' height='14px' src={searchImg} className="absolute"/></button>
        </form>
        <section>
          
        </section>
      </main>
    </section>
  )
}