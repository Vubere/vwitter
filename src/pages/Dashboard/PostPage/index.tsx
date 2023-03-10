import { useContext, useLayoutEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { PostItem } from "../../../components/PostItem"
import Icon from "../../../components/icon"


import avatar from '../../../assets/avatar.jpg'
import Back from "../../../components/Back"

import reply from '../../../components/Reactions/reply.png'
import like from '../../../components/Reactions/like.png'
import likeFilled from '../../../components/Reactions/likeFilled.png'
import retweet from '../../../components/Reactions/retweet.png'
import retweetFilled from '../../../components/Reactions/retweetFilled.png'


import Comment from "./components/comment"

import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { UserCon, user_info } from "../../../context/UserContext"
import { db } from "../../../main"
import getUserById from "../../../services/getUserById"
import getPostById from "../../../services/getPostById"
import Load from "../../../components/load"
import { formatDistanceToNow } from "date-fns/esm"
import * as routes from '../../../constants/route'
import { user_basic_info } from "../../Chat"
import VerticalMenu from "../../../components/verticalMenu"


export default function PostPage() {
  const [post, setPost] = useState<PostItem | undefined>()

  const { postId } = useParams()
  const navigate = useNavigate()
  const [postOwner, setPostOwner] = useState<user_basic_info>()

  const { currentUser } = getAuth()
  const user = useContext(UserCon)
  const [likes, setLiked] = useState<string[]>([])
  const [retweeted, setRetweeted] = useState<string[]>([])
  const [loading, setLoading] = useState(false)


  useLayoutEffect(() => {
    if (postId) {
      (async () => {
        setLoading(true)
        const post = await getPostById(postId)
        if (post) {
          const pO = await getUserById(post.post_owner)

          setPost(post)
          setLiked(post.likes)
          setRetweeted(post.retweets)
          if (pO)
            setPostOwner(pO.details)
        }
        setLoading(false)
      })()
    }
  }, [postId])
  if (post == undefined || loading) {
    return (<Load />)
  }


  if (!postId) {
    navigate('/home')
    return null
  }
  const toggleLike = async () => {
    if (currentUser && user?.user?.details) {
      const docRef = doc(db, 'posts', postId)
      const userRef = doc(db, 'users', currentUser.uid)
      if (likes?.includes(currentUser.uid)) {
        try {
          setLiked(likes?.filter(v => v != currentUser.uid))
          await updateDoc(docRef, {
            likes: arrayRemove(currentUser.uid)
          })
          await updateDoc(userRef, {
            likes: arrayRemove(postId)
          })
        } catch (err) {

        }
      } else {
        try {
          setLiked(likes?.concat([currentUser.uid]))
          await updateDoc(docRef, {
            likes: arrayUnion(currentUser.uid)
          })

          await updateDoc(userRef, {
            likes: arrayUnion(postId)
          })
          const ownerRef = doc(db, 'users', post.post_owner)
          const notifId = postId + 'l' + currentUser.uid + Date.now()
          const notifRef = doc(db, 'notifications', notifId)
          await setDoc(notifRef, {
            type: 'like',
            user: user.user.details.id,
            ref: {
              res: 'tweet',
              info: `${post.caption}`
            },
            id: notifId,
            time: Date.now()
          })
          await updateDoc(ownerRef, {
            notifications: arrayUnion(notifId),
            unread_notifications: increment(1)
          })

        } catch (err) {

        }
      }
    }
  }

  const toggleRetweet = async () => {
    const docRef = doc(db, 'posts', postId)
    if (currentUser && user?.user?.details) {
      if (retweeted.includes(currentUser.uid)) {
        try {
          setRetweeted(retweeted.filter(i => i != currentUser.uid))
          await updateDoc(docRef, {
            retweets: arrayRemove(currentUser.uid)
          })
          const userRef = doc(db, 'users', currentUser.uid)
          const userD = await getUserById(currentUser.uid)
          const p = userD.posts.filter((item) => !(item.id == postId && item.type == 'retweet'))
          await setDoc(userRef, {
            posts: p
          }, {merge:true})

        } catch (err) {

        }
      } else {
        try {
          setRetweeted(retweeted.concat([currentUser.uid]))
          await updateDoc(docRef, {
            retweets: arrayUnion(currentUser.uid)
          })
          const userRef = doc(db, 'users', currentUser.uid)

          await updateDoc(userRef, {
            posts: arrayUnion({
              id: postId,
              type: 'retweet',
              time: Date.now()
            }),
          })
          const ownerRef = doc(db, 'users', post.post_owner)
          const notifId = postId + 'r' + currentUser.uid + Date.now()
          const notifRef = doc(db, 'notifications', notifId)
          await setDoc(notifRef, {
            type: 'retweet',
            user: user?.user?.details.id,
            ref: {
              res: 'tweet',
              info: `${post.caption}`
            },
            id: notifId,
            time: Date.now()
          })
          await updateDoc(ownerRef, {
            notifications: arrayUnion(notifId),
            unread_notifications: increment(1)
          })
        } catch (err) {

        }
      }
    }
  }

  const deleteDocu = async () => {
    if (currentUser) {

      const docRef = doc(db, 'posts', postId)
      await deleteDoc(docRef)
      const userRef = doc(db, 'users', currentUser.uid)
      const res = await getDoc(userRef) 
      if(res.data()){
        const {posts: pn} = res.data() as user_info
        const p = pn.filter((v)=>v.id!=postId)
        await updateDoc(userRef, {
          posts: p
        })
        navigate(-1)
      }
    }

  }

  if (!postOwner || loading) {
    return <Load />
  }

  return (
    <section className="overflow-auto pb-20 pt-10">
      <header className="w-full min-h-[20px] p-3 pl-14 bg-black fixed top-0">
        <Back className="w-[20px] h-[20px] absolute top-4 left-3" click={() => navigate(-1)} />
        <h3 className="font-[600] text-[18px]">Thread</h3>
      </header>
      <section className="w-[100vw] p-4 pt-6 pb-0 flex flex-col gap-3 border-b border-[#fff2] items-center overflow-auto">
        <div className="flex gap-3 w-full">
          <Link to={routes.profile + '/' + postOwner.username}>
            <Icon
              src={`${postOwner.avatar != '' ? postOwner.avatar : avatar}`}
              width='45px'
              height="45px"
              className="rounded-full"
            />
          </Link>
          <div className="">
            <Link to={routes.profile + '/' + postOwner.username}>
              <p className="font-[600]">{postOwner.name}</p>
            </Link>
            <Link to={routes.profile + '/' + postOwner.username}>
              <p className="text-[#fff6]">@{postOwner.username}</p>
            </Link>
          </div>
          {
            postOwner.id==currentUser?.uid?
            (<div className="absolute right-0"><VerticalMenu
            className="string"
            text="delete post"
            click={deleteDocu} /></div>):null
          }
        </div>
        <section className="w-full ">
          <div className="border-b border-[#fff4] w-full pb-3">
            <p className="text-[#fff] text-[22px] pb-3">{post.caption}</p>
            <div className="max-h-[300px] overflow-hidden flex items-center rounded-[10px]">
              <img src={post.photoUrl}
                width='100%' className='rounded-[10px]' />
            </div>
            <p className="text-[#fff6] mt-3 ">{formatDistanceToNow(Number(post.date))}</p>
          </div>
          <div className="flex gap-5 pl-4 items-center h-[50px] border-b border-[#fff4]">
            <p>{post.comments.length} <span className="text-[#fff4]">Replies</span></p>
            <p>{retweeted.length} <span className="text-[#fff4]">Retweets</span></p>
            <p>{likes.length} <span className="text-[#fff4]">Likes</span></p>
          </div>
          <div className="flex  w-[75%] justify-between p-5 h-[30px]">
            <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
              <Link to={'/reply/' + postId}>
                <Icon
                  src={reply}
                  width="20px"
                  height='20px'
                />
              </Link>
            </p>
            <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
              <Icon
                src={user?.user && retweeted.includes(user.user?.details.id) ? retweetFilled : retweet}
                width="25px"
                height='25px'
                onClick={toggleRetweet}
              />
            </p>
            <p className='text-[12px] text-[#fff4] flex gap-1 items-center'>
              <Icon
                src={user?.user && likes.includes(user.user?.details.id) ? likeFilled : like}
                width="20px"
                height='20px'
                onClick={toggleLike}
              />
            </p>
          </div>
        </section>
      </section>
      <section className="flex flex-col justify-center">
        {post.comments.map((item) => <Comment details={item} postowner={post.post_owner} key={item.date} />)}
      </section>
    </section>
  )
}


/* {
    type: 'tweet',
    comments: [{
      text: 'aum',
      likes: [''],
      photoUrl: '',
      date: '40m',
      commentOwner: {
        avatar: '',
        username: 'victorubere',
        full_name: 'Victor Ubere',
        id: 'u23h'
      },
      postOwner: {
        avatar: '',
        username: 'victorubere',
        full_name: 'Victor Ubere',
        id: 'u23h'
      },
      replies: [{
        text: 'text',
        photoUrl: avatar,
        likes: [''],
        date: '40m',
        commentOwner: {
          avatar: '',
          username: 'hakk',
          full_name: 'hakk rubee',
          id: 'adhs',
        },
        postOwner: {
          avatar: '',
          username: 'hakk',
          full_name: 'hakk rubee',
          id: 'adhs',
        },
        replies: []
      }]
    }],
    post_owner: {
      avatar: '',
      username: 'victorubere',
      full_name: 'Victor Ubere',
      id: 'hiaph'
    },
    photoUrl: avatar,
    likes: [''],
    caption: 'this is a test data',
    date: '20m',
    id: 'dah'
  } */