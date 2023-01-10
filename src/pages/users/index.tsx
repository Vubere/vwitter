import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


import UserDisplay from "../../components/UserDisplay"
import Back from "../../components/Back"

import { details } from "../Signup/signupFlow"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../main"
import { UserCon } from "../../context/UserContext"
import Load from "../../components/load"

export default function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<details[]>([])
const [loading, setLoading] = useState(true)
  const userContext = useContext(UserCon)

  
  const getUsers = async() => {
    const col = collection(db, 'users')
    const res = (await getDocs(col)).docs

    if(res.length&&userContext?.user){
      const arr:details[] = []
      res.forEach((v, t)=>{
        const u = v.data().details as details
        if(u.id!=userContext.user?.details.id){
          arr.push(u)
        }
        if(t==res.length-1){
          setUsers(users.concat(arr))
        }
      })
    }
  }

  useEffect(()=>{
    getUsers()
    setLoading(false)
  }, [])
  
  if(!userContext?.user?.details){
    return null
  }


  return (
    <section >
      <header className="flex gap-3 p-3 border-b border-[#fff2] items-center">
        <Back click={() => navigate(-1)} className="w-[20px] h-[20px]" />
        <h3 className="font-[600] text-[18px]">Users</h3>
      </header>
      <main className="p-3 flex flex-col gap-2">
        {loading?<Load/>:users.length ? users.map((item) => (
          <UserDisplay key={item.id} details={item} />
        )) : <p>Couldn't fetch users...</p>}
      </main>
    </section>
  )
}