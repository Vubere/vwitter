import { useContext, useEffect, useLayoutEffect, useState } from "react"

import PostItem from "../Dashboard/home/components/PostItem"

import { Comments, PostItem as PItype } from "../Dashboard/home/components/PostItem"
import Comment from "../Dashboard/PostPage/components/comment"




import getUserById from "../../services/getUserById"
import Load from "../../components/load"

export default function likes({ id }: { id: string }) {
  const [posts, setPosts] = useState<string[]>()
  const [loading, setLoading] = useState(false)



  useLayoutEffect(() => {
    (async () => {
      if (id) {
        setLoading(true)
        const { likes: p } = await getUserById(id)

        const set = new Set(p)
        setPosts(Array.from(set))

        setLoading(false)
      }
    })()

  }, [])

  if (loading) {
    return <Load h='250px' />
  }

  console.log(posts)
  return (
    <section className="flex flex-col justify-center items-center w-[100%]">
      {
        posts?.length ? (
          posts.map((item) => (
            <PostItem type={'tweet'} id={item} key={item} />
          ))
        ) : <p className="p-2">no tweets...</p>
      }
    </section>
  )
}