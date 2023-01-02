import { doc, getDoc } from "firebase/firestore"
import { user_info } from "../context/UserContext"
import { db } from "../main"


export default async function getUserById(id:string){
  const docRef = doc(db, 'users', id)
  const result = await getDoc(docRef)
  const user:user_info|undefined = result.data() as user_info
  
  return user
}