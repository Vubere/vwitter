import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import Back from "../../components/Back";
import Icon from '../../components/icon';
import Cancel from '../../components/CancelIcon';

import avatar from '../../assets/avatar.jpg'
import imagePic from '../../assets/image.png'

import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { db } from '../../main';


import { UserCon } from '../../context/UserContext';

import Postshow, { PostItem } from '../Dashboard/home/components/PostItem';
import Load from '../../components/load';
import { user_basic_info } from '../Chat';
import getUserById from '../../services/getUserById';

export default function SendPost() {
  const { reply } = useParams()
  const [post, setPost] = useState('')
  const [image, setImage] = useState<any>()
  const navigate = useNavigate()

  const input_ref = useRef<any>()
  const imageRef = useRef<any>()
  const viewRef = useRef<any>()

  const { currentUser } = getAuth()
  const context = useContext(UserCon)

  const [details, setDetails] = useState<PostItem>()
  const [loading, setLoading] = useState(false)
  const [postOwner, setPostOwner] = useState<user_basic_info>()

  useEffect(() => {
    if (input_ref.current) {
      input_ref.current.focus()
      input_ref.current.scrollIntoView()
    }
  }, [details])
  useEffect(() => {
    (async () => {
      if (reply && currentUser) {
        setLoading(true)
        const docRef = doc(db, 'posts', reply)
        const res = await getDoc(docRef)
        const data = res.data() as PostItem | undefined
        if (data) {
          setDetails(data)
          const pO = await getUserById(data.post_owner)
          if(pO)
          setPostOwner(pO.details)
        }
        setLoading(false)
      }
    })()
  }, [])
  if (!details||loading) {
    return <Load/>
  }

  const handleFileChange = (e: any) => {

    if (e.target.files) {

      setImage(e.target.files[0])
      if (e.target.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {

          if (viewRef.current != undefined) {
            viewRef.current.src = e.target?.result
          }
        }
        reader.readAsDataURL(e.target.files[0])
      }
    }
  }
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentUser && context?.user && reply) {
      try {
        const user = context.user
        const docRef = doc(db, 'posts', reply)
        const storage = getStorage()
        const filePath = `users/${currentUser.uid}/post/replies/${Date.now}`
        const storageRef = ref(storage, filePath)
        let path = ''
        if (image != undefined) {
          const res = await uploadBytes(storageRef, image)
          path = await getDownloadURL(res.ref)
        }
        await setDoc(docRef, {
          ...details,
          comments: arrayUnion({
            text: post,
            photoUrl: path,
            replies: [],
            likes: [],
            commentOwner: user.details.id,
            date: Date.now(),
            postOwner: details.post_owner
          })
        }, {merge: true})

        setImage(undefined)
        imageRef.current.value = undefined
      } catch (err) {

      }
    }
  }
  if(!postOwner){
    return <Load/>
  }

  return (
    <section className='relative w-full flex flex-col gap-3 pt-[50px] p-3 pb-[200px] items-center'>
      <div className='fixed top-0 w-full h-[45px] bg-[#000d]'>
        <Back
          className="w-[20px] h-[20px] fixed top-2 left-3"
          click={() => navigate(-1)} />
      </div>
      <section className="w-[100%] p-3 pt-2 pt-6 pb-5 flex gap-1 border border-[#fff2] flex-col p-3 items-center">
        <div className="flex flex-col gap-3">
          <div>
            <Icon
              src={`${postOwner.avatar != '' ? postOwner.avatar : avatar}`}
              width='45px'
              height="45px"
              className="rounded-full"
            />
          </div>
          <div className="w-full pr-4">
            <div className="flex gap-1">
              <p className="font-[600]">{postOwner.name}</p>
              <p className="text-[#fff6]">@{postOwner.username}</p>
              <p className="text-[#fff6]">{details.date}</p>
            </div>
            <div>
              <p className="text-[#fff9] pb-3">{details.caption}</p>
              <div className="max-h-[300px] overflow-hidden flex items-center rounded-[10px]">
                <img src={details.photoUrl}
                  width='100%' className='rounded-[10px]' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <form onSubmit={submit} className='w-[95%] h-[150px]'>

        <textarea name="post" id="post"
          value={post} onChange={({ target }) => setPost(target.value)}
          ref={input_ref} className='resize-none border-b border-[#fff2] bg-transparent placeholder:text-[#fff4] w-[90%] h-[100px]' placeholder="What's happening?"></textarea>
        <button className='bg-[#447cef] w-[80px] h-[30px] rounded-full fixed top-2 right-3 '>
          Tweet
        </button>
        <label htmlFor="file" className='pt-3  block'>
          <Icon width='20px' height='20px' src={imagePic} />
          <input type="file" name="file" id="file" className='hidden'
            ref={imageRef}
            multiple={true} onChange={handleFileChange} />
        </label>
        {image != undefined &&
          <div className="mt-3 flex flex-col gap-2">
            <Cancel onClick={() => {
              if (imageRef) {
                imageRef.current.value = null
              }
              setImage(undefined)
            }} />
            <img ref={viewRef} alt="imagePreview" src="#" className='w-[250px] rounded-[8px] border border-[#fff3]' />
          </div>
        }
      </form>
    </section>
  )
}