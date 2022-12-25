import logout from '../../assets/logout.png'

export default function SN_footer() {
  return (
    <div className='border-t w-[90%] border-[#fff4] mr-auto ml-auto p-4 mt-auto absolute bottom-5'>
      <p className='text-[14px] flex '>
        <span
          className='w-[25px] h-[25px] mr-3 block'
          aria-label='logout icon'
          style={{
            backgroundImage: `url(${logout})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}></span>
        logout
      </p>
    </div>
  )
}