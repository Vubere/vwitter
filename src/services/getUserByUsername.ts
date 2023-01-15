import { doc, collection, where, getDocs, query, DocumentData } from "firebase/firestore";
import { user_info } from "../context/UserContext";
import { db } from "../main";


export default async function getUserByUsername(username:string){
  
  const docRef = collection(db, "users");
  const q = query(docRef, where("details.username", "==", username));
  const snapShot = await getDocs(q);
  const n = snapShot.docs[0]?.data()
  
  return n as user_info
}