import Icon from '../../../../../components/icon'

import like from './like.png'
import likeFilled from './likeFilled.png'
import retweet from './retweet.png'
import retweetFilled from './retweetFilled.png'
import reply from './reply.png'
import { user_details } from '../PostItem'

import { Comments } from '../PostItem'

export default function Reactions({ likes, comments }: { likes: string[], comments: Comments[]}) {
  return (
    <div className='flex justify-between pt-3 w-[85%]'>
      <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
        <Icon
          src={reply}
          width="20px"
          height='20px'
        />{' '}
        {comments.length}
      </p>
      <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
        <Icon
          src={retweet}
          width="20px"
          height='20px'
        />{' '}
        {likes.length}
      </p>
      <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
        <Icon
          src={like}
          width="20px"
          height='20px'
        />{' '}
        {likes.length}
      </p>
    </div>
  )
}