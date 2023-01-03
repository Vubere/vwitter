import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { user_info } from "../context/UserContext";
import { db } from "../main";


export default function useUser(username:string) {
  const [profile, setProfile] = useState<user_info>();
  
  useEffect(() => {
    let unsub:any = null
    const fetch =async () => {
      const docRef = collection(db, "users");
      const q = query(docRef, where("details.username", "==", username));
      const snapShot = await getDocs(q);
      const n = snapShot.docs[0].data();
      unsub =  onSnapshot(q, (doc) => {
        const profileDetails = doc.docs[0];
        setProfile(profileDetails.data() as user_info);
      });
    }
    if(unsub){
      return unsub()
    } 
  }, [username]);

  return [profile]
}
