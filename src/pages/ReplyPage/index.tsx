import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Back from "../../components/Back";
import Icon from '../../components/icon';

import avatar from '../../../assets/avatar.jpg'
import imagePic from '../../../assets/image.png'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../main';
import { getAuth } from 'firebase/auth';
import { UserCon } from '../../context/UserContext';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import Cancel from '../../components/CancelIcon';

export default function SendPost() {
  const [post, setPost] = useState('')
  const [image, setImage] = useState<any>()
  const navigate = useNavigate()

  const input_ref = useRef<any>()
  const imageRef = useRef<any>()
  const viewRef = useRef<any>()

  const { currentUser } = getAuth()
  const context = useContext(UserCon)


  useEffect(() => {
    input_ref.current.focus()
  }, [])

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
    if (currentUser && context?.user) {
      try {
        const user = context.user
        const id = currentUser.uid + '' + Date.now()
        const docRef = doc(db, 'posts', id)
        const storage = getStorage()
        const filePath = `users/${currentUser.uid}/post/${Date.now}`
        const storageRef = ref(storage, filePath)
        let path = ''
        if (image != undefined) {
          const res = await uploadBytes(storageRef, image)
          path = await getDownloadURL(res.ref)
        }
        await setDoc(docRef, {
          type: 'tweet',
          comments: [],
          post_owner: {
            avatar: user.details.avatar,
            username: user.details.username,
            full_name: user.details.name,
            id: user.id
          },
          photoUrl: path || '',
          likes: [],
          caption: post,
          date: Date.now(),
          id: id
        })
        const userRef = doc(db, 'users', currentUser.uid)
        await updateDoc(userRef, {
          posts: arrayUnion(id)
        })
        setImage(undefined)
        imageRef.current.value = undefined
      } catch (err) {

      }

    }
  }

  return (
    <section className='relative w-full flex gap-3 pt-[50px] p-3'>
      <Back
        className="w-[20px] h-[20px] absolute top-2 left-3"
        click={() => navigate('/home')} />
      <Icon width='50px' height='50px' src={avatar} className='rounded-full min-w-[50px]' />
      <form onSubmit={submit} className='w-[95%] h-[150px]'>

        <textarea name="post" id="post"
          value={post} onChange={({ target }) => setPost(target.value)}
          ref={input_ref} className='resize-none border-b border-[#fff2] bg-transparent placeholder:text-[#fff4] w-[90%] h-[100px]' placeholder="What's happening?"></textarea>
        <button className='bg-[#447cef] w-[80px] h-[30px] rounded-full absolute top-2 right-3 '>
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