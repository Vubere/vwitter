

import Icon from '../../../../components/icon'
import profile from './profileFilled.png'

export default function FollowedNotif({details}:any){
  return (
    <div className='w-full flex p-3 gap-2 border-b-[0.1em] border-[#fff2] pl-5'>
      <Icon
      src={profile}
      width='30px'
      height='30px'
      />
      <div>
        <Icon
        src={profile}
        width='40px'
        height='40px'
          className='rounded-full mb-2 border border-[#fff3]'
        />
        <p><span className="font-[700]">{details.full_name}</span> followed you</p>
      </div>
    </div>
  )
}