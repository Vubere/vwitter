import { useState } from "react"
import PostItem from "../Dashboard/home/components/PostItem"

import { Comments, PostItem as PItype } from "../Dashboard/home/components/PostItem"
import Comment from "../Dashboard/PostPage/components/comment"

export default function likes(){

  const [likes, setLikes] = useState<(PItype|Comments)[]>()

  return(
    <section>
      {likes?.length?likes.map((item)=>{
        if('type' in item){
          return <PostItem details={item}/>
        }else{
          return <Comment details={item} postowner={item.postOwner}/>
        }
      }):<p>no likes...</p>}
    </section>
  )
}