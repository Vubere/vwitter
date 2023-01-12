import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { postType } from "../components/PostItem"


export const FeedContext = createContext<{ setFeedList: Dispatch<SetStateAction<postType[] | undefined>>, feedList: postType[] | undefined } | undefined>(undefined)

export default function FeedCache({children}:{children:ReactNode}) {
  const [feedList, setFeedList] = useState<postType[]>()


  return (
    <FeedContext.Provider value={{ setFeedList, feedList }}>
      {children}
    </FeedContext.Provider>
  )
}