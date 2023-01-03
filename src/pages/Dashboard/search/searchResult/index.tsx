import UserDisplay from "../../../../components/UserDisplay";
import { user_info } from "../../../../context/UserContext";

export default function SearchResult({result, search}:{result: user_info[], search: string}){

  return (
    <section className="p-2 mb-3">
      <h4 className="mb-4">Search results for {search}</h4>
      {typeof result=='object'?
      result.map((item)=><UserDisplay details={item.details} />)
      :<p className="text-[14px] text-[#fff7]">Searched user don't exist</p>
      }
    </section>
  )
}