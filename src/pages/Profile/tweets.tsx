import { useContext, useEffect, useLayoutEffect, useState } from "react"
import PostItem from "../Dashboard/home/components/PostItem"

import avatar from '../../assets/avatar.jpg'
import { UserCon } from "../../context/UserContext"

export default function tweets(){
  const [posts, setPosts] = useState<string[]>()

  const user = useContext(UserCon)
  if(user?.user==undefined){
    return null
  }
  useLayoutEffect(()=>{
    
  }, [])

  return(
    <section className="flex flex-col justify-center items-center w-[100%]">
      {
        posts?.length?(
          posts.map((item)=>(
            <PostItem id={item}/>
          ))
        ):<p className="p-2">no tweets...</p>
      }
    </section>
  )
}