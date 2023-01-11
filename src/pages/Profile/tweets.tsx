import { useContext, useEffect, useLayoutEffect, useState } from "react"
import PostItem, { postType } from "../../components/PostItem"

import avatar from '../../assets/avatar.jpg'
import { UserCon } from "../../context/UserContext"
import getUserById from "../../services/getUserById"
import Load from "../../components/load"

export default function tweets({ id }: { id: string }) {
  const [posts, setPosts] = useState<postType[]>()
  const [loading, setLoading] = useState(false)



  useLayoutEffect(() => {
    (async () => {
      if (id) {
        setLoading(true)
        const { posts: p } = await getUserById(id)

        const set = new Set(p)
        setPosts(Array.from(set))

        setLoading(false)
      }
    })()

  }, [])

  if (loading) {
    return <Load h='250px' />
  }

  return (
    <section className="flex flex-col justify-center items-center w-[100%]">
      {
        posts?.length ? (
          posts.map((item) => (
            <PostItem id={item.id} type={item.type} key={item.id} retweeter={item?.retweeter}/>
          ))
        ) : <p className="p-2">no tweets...</p>
      }
    </section>
  )
}