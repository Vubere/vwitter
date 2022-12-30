import { useState } from "react"
import { user_details } from "../Dashboard/home/components/PostItem"

import UserDisplay from "../../components/UserDisplay"
import Back from "../../components/Back"
import { useNavigate } from "react-router-dom"


export default function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<user_details[]>()

  return (
    <section >
      <header className="flex gap-3 p-3 border-b border-[#fff2] items-center">
        <Back click={() => navigate(-1)} className="w-[20px] h-[20px]" />
        <h3 className="font-[600] text-[18px]">Users</h3>
      </header>
      <main className="p-3">
        {users?.length ? users.map((item) => (
          <UserDisplay details={item} />
        )) : <p>Couldn't fetch users...</p>}
      </main>
    </section>
  )
}