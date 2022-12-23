import twitter from '../assets/twitterLogo.svg'


export default function TwitterIcon() {
  return (
    <div className="w-[40px] h-[40px] "
    style={{
      backgroundImage: `url(${twitter})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    }}>
    </div>
  )
}