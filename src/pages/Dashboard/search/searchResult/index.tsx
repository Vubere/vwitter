import UserDisplay from "../../../../components/UserDisplay";
import { user_details } from "../../home/components/PostItem";

export default function SearchResult({result, search}:{result: user_details[]|string, search: string}){

  return (
    <section className="p-2 mb-3">
      <h4 className="mb-4">Search results for {search}</h4>
      {typeof result=='object'?
      result.map((item)=><UserDisplay avatar={item.avatar} username={item.username} full_name={item.full_name} />)
      :<p className="text-[14px] text-[#fff7]">Searched user don't exist</p>
      }
    </section>
  )
}