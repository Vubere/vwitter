import { useNavigate } from "react-router-dom";
import Back from "../../components/Back";



export default function Todo() {
  const navigate = useNavigate()

  return (
    <section className="w-full">
      <header className="flex  gap-2 items-center p-3 border-b border-[#fff3]">
        <Back click={() => navigate(-1)} className="w-[30px] h-[15px]" />
        <h3 className="font-[600] text-[20px]">Todo</h3>
      </header>
      <main className="w-[100%] p-3">
        <form onSubmit={() => null} className='w-full flex items-center'>
          <label htmlFor="text" className="w-[90%] block border p-4 rounded-full ml-auto mr-auto">
            <input type="text" id="text"
              className="bg-transparent placeholder:text-[#fff4]" placeholder="add todo..." />
          </label>
        </form>
      </main>
    </section>
  )
}