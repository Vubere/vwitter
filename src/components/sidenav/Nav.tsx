import profile from '../../assets/profile.png'
import todo from '../../assets/to-do.png'
import people from '../../assets/people.png'

export default function SN_Nav() {

  return (
    <nav className='w-[100%]'>
      <ul className="w-full p-4">
        <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'>
          <div
            className='w-[25px] h-[25px]'
            style={{
              backgroundImage: `url(${profile})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}></div>
          Profile</li>
        <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'>
          <div
            className='w-[25px] h-[25px]'
            style={{
              backgroundImage: `url(${todo})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}></div>
          Todo</li>
        <li className='flex gap-6 items-center mb-5 font-[600] text-[18px]'>
          <div
            className='w-[25px] h-[25px]'
            style={{
              backgroundImage: `url(${people})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}></div>
          Users</li>
      </ul>
    </nav>
  )
}