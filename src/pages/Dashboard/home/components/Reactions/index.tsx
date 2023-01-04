import Icon from '../../../../../components/icon'

import like from './like.png'
import likeFilled from './likeFilled.png'
import retweet from './retweet.png'
import retweetFilled from './retweetFilled.png'
import reply from './reply.png'
import { PostItem } from '../PostItem'

import { Comments } from '../PostItem'
import { useContext, useState } from 'react'
import { arrayRemove, arrayUnion, deleteDoc, doc, increment, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../main'
import { getAuth } from 'firebase/auth'
import { UserCon } from '../../../../../context/UserContext'
import { Link } from 'react-router-dom'

export default function Reactions({ details, id, likes, comments, retweets }: { details: PostItem, id: string, likes: string[], comments: Comments[], retweets: string[] }) {

  const [likedCheck, setLiked] = useState<string[]>(likes)
  const [retweeted, setRetweeted] = useState<string[]>(retweets)
  const { currentUser } = getAuth()
  const user = useContext(UserCon)

  const toggleLike = async () => {
    if (currentUser) {
      const docRef = doc(db, 'posts', id)
      const userRef = doc(db, 'users', currentUser.uid)
      if (likedCheck.includes(currentUser.uid)) {
        try {
          setLiked(likedCheck.filter(v => v != currentUser.uid))
          await updateDoc(docRef, {
            likes: arrayRemove(currentUser.uid)
          })
          await updateDoc(userRef, {
            likes: arrayRemove(currentUser.uid)
          })
        } catch (err) {

        }
      } else {
        try {
          setLiked(likedCheck.concat([currentUser.uid]))
          await updateDoc(docRef, {
            likes: arrayUnion(currentUser.uid)
          })
          await updateDoc(userRef, {
            likes: arrayUnion(currentUser.uid)
          })
          const ownerRef = doc(db, 'users', details.post_owner.id)
          const notifId = id + 'l' + currentUser.uid
          const notifRef = doc(db, 'notifications', notifId)
          await setDoc(notifRef, {
            type: 'like',
            user: {
              username: user?.user?.details.id,
              name: user?.user?.details.name,
              avatar: user?.user?.details.avatar,
              id: user?.user?.details.id
            },
            ref: {
              res: 'tweet',
              info: `${details.caption}`
            },
            id: notifId
          })
          await updateDoc(ownerRef, {
            notifications: arrayUnion([notifId]),
            unread_notifications: increment(1)
          })
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
          setRetweeted(retweeted.filter(i => i != currentUser.uid))
          await updateDoc(docRef, {
            retweets: arrayRemove(currentUser.uid)
          })
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
          setRetweeted(retweeted.concat([currentUser.uid]))
          await updateDoc(docRef, {
            retweets: arrayUnion(currentUser.uid)
          })
          const userRef = doc(db, 'users', currentUser.uid)
          const retId = id + 'r' + currentUser.uid
          const retRef = doc(db, 'posts', retId)
          await setDoc(retRef, {
            ...details,
            type: retweet,
            retweeter: user.user.details
          })
          await updateDoc(userRef, {
            posts: arrayUnion(retId),
          })
          const ownerRef = doc(db, 'users', details.post_owner.id)
          const notifId = id + 'r' + currentUser.uid
          const notifRef = doc(db, 'notifications', notifId)
          await updateDoc(notifRef, {
            type: 'retweet',
            user: {
              username: user?.user?.details.id,
              name: user?.user?.details.name,
              avatar: user?.user?.details.avatar,
              id: user?.user?.details.id
            },
            ref: {
              res: 'tweet',
              info: `${details.caption}`
            },
            id: notifId
          })
          await updateDoc(ownerRef, {
            notifications: arrayUnion(notifId),
            unread_messages: increment(1)
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
          onClick={toggleRetweet}
        />{' '}
        {retweeted.length}
      </p>
      <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
        <Icon
          src={currentUser ? likedCheck.includes(currentUser.uid) ? likeFilled : like : like}
          width="20px"
          height='20px'
          onClick={toggleLike}
        />{' '}
        {likedCheck.length}
      </p>
    </div>
  )
}