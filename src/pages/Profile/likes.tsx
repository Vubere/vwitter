import { useState } from "react"
import PostItem from "../Dashboard/home/components/PostItem"

import { Comments, PostItem as PItype } from "../Dashboard/home/components/PostItem"
import Comment from "../Dashboard/PostPage/components/comment"

export default function likes(){

  const [likes, setLikes] = useState<string[]>()

  return(
    <section>
      {likes?.length?likes.map((item)=>{
          return <PostItem id={item}/>
      }):<p>no likes...</p>}
    </section>
  )
}