import Icon from '../../../../../components/icon'

import like from './like.png'
import likeFilled from './likeFilled.png'
import retweet from './retweet.png'
import retweetFilled from './retweetFilled.png'
import reply from './reply.png'
import { PostItem } from '../PostItem'

import { Comments } from '../PostItem'
import { useContext, useState } from 'react'
import { arrayRemove, arrayUnion, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../main'
import { getAuth } from 'firebase/auth'
import { UserCon } from '../../../../../context/UserContext'
import { Link } from 'react-router-dom'

export default function Reactions({ details, id, likes, comments, retweets }: { details: PostItem, id: string, likes: string[], comments: Comments[], retweets: string[] }) {

  const [likedCheck, setLiked] = useState<string[]>(likes)
  const [retweeted, setRetweeted] = useState<string[]>(retweets)
  const [replies, setReplies] = useState<Comments[]>(comments)
  const { currentUser } = getAuth()
  const user = useContext(UserCon)

  const toggleLike = async () => {
    if (currentUser) {
      const docRef = doc(db, 'posts', id)
      if (likedCheck.includes(currentUser.uid)) {
        try {
          const res = await updateDoc(docRef, {
            likes: arrayRemove(currentUser.uid)
          })
          setLiked(likedCheck.filter(v => v != currentUser.uid))
        } catch (err) {

        }
      } else {
        try {
          const res = await updateDoc(docRef, {
            likes: arrayUnion(currentUser.uid)
          })
          setLiked(likedCheck.concat([currentUser.uid]))
        } catch (err) {

        }
      }
    }
  }

  const toggleRetweet = async () => {
    const docRef = doc(db, 'posts', id)
    if (currentUser && user?.user) {
      if (retweeted.includes(currentUser.uid)) {
        try {
          await updateDoc(docRef, {
            retweets: arrayRemove(currentUser.uid)
          })
          setRetweeted(retweeted.filter(i => i != currentUser.uid))
          const userRef = doc(db, 'users', currentUser.uid)
          await updateDoc(userRef, {
            posts: arrayRemove(id + '' + currentUser.uid)
          })
          const delRef = doc(db, 'posts', id + '' + currentUser.uid)
          await deleteDoc(delRef)
        } catch (err) {

        }
      } else {
        try {
          await updateDoc(docRef, {
            retweets: arrayUnion(currentUser.uid)
          })
          setRetweeted(retweeted.concat([currentUser.uid]))
          const userRef = doc(db, 'users', currentUser.uid)
          const retId = id + '' + currentUser.uid
          const retRef = doc(db, 'posts', retId)
          await setDoc(retRef, {
            ...details,
            type: retweet,
            retweeter: user.user.details
          })
          await updateDoc(userRef, {
            posts: arrayUnion(retId),
          })
        } catch (err) {

        }
      }
    }
  }

  return (
    <div className='flex justify-between pt-3 w-[85%]'>
      <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
        <Link to={'/reply/'+id}>
          <Icon
            src={reply}
            width="20px"
            height='20px'
          />{' '}
        </Link>
        {comments.length}
      </p>
      <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
        <Icon
          src={currentUser ? retweeted.includes(currentUser.uid) ? retweetFilled : retweet : retweet}
          width="20px"
          height='20px'
        />{' '}
        {retweets.length}
      </p>
      <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
        <Icon
          src={currentUser ? likedCheck.includes(currentUser.uid) ? likeFilled : like : like}
          width="20px"
          height='20px'
        />{' '}
        {likes.length}
      </p>
    </div>
  )
}