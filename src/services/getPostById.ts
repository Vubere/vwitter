import { doc, getDoc } from "firebase/firestore"
import { db } from "../main"
import { PostItem } from "../pages/Dashboard/home/components/PostItem"


export default async function getPostById(id:string) {
  
  const docRef = doc(db, 'posts', id)
  const result = await getDoc(docRef)
  const post = result.data() as PostItem
  return result.exists()?post:undefined
}