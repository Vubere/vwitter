import { useState } from "react"
import { user_basic_info } from "../Chat"

import { Comments } from "../Dashboard/home/components/PostItem"
import Comment from "../Dashboard/PostPage/components/comment"

export default function replies() {

  const [replies, setReplies] = useState<replies[]>()

  return (
    <section className="flex flex-col items-center w-full p-3">
      {replies?.length ? replies.map((item) => (
        <Comment details={item.comment} postowner={item.postOwner} key={item.postId} />
      )) : <div>no replies...</div>}

    </section>
  )
}

type replies = {
  comment: Comments,
  postOwner: string,
  postId: string
}