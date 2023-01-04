
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Back from "../../components/Back"
import Load from "../../components/load"
import UserDisplay from "../../components/UserDisplay"
import { UserCon, user_info } from "../../context/UserContext"

import getUserById from "../../services/getUserById"
import { user_basic_info } from "../Chat"



export default function Following() {
  const [following, setFollowing] = useState<user_basic_info[]>([])
  const context = useContext(UserCon)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useLayoutEffect(()=>{
    if(context?.user?.following){
      const f = context.user.following;
      const arr:any[] = []
      setLoading(true)
      f.forEach((id, i)=>{
        (async()=>{
          const res = await getUserById(id)
          if(res){
            arr.push(res.details)
          }
        })()
        if(i==f.length-1){
          setFollowing(arr)
        }
      })
      setLoading(false)
    }
  },[])



  return (
    <section >
      <header className="flex gap-3 p-3 border-b border-[#fff2] items-center">
        <Back click={() => navigate(-1)} className="w-[20px] h-[20px]" />
        <h3 className="font-[600] text-[18px]">Following</h3>
      </header>
      <main className="p-3 flex flex-col gap-2">
        {loading ? <Load /> : following.length ? following.map((item) => (
          <UserDisplay key={item.id} details={item} />
        )) : <p>Couldn't fetch users...</p>}
      </main>
    </section>
    )
}