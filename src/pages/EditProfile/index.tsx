import { useNavigate } from "react-router-dom";

import Back from "../../components/Back";
import Icon from "../../components/icon";
import Input from "../../components/input";

import avatar from '../../assets/avatar.jpg'
import camera from '../../assets/camera.png'
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserCon } from "../../context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../main";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import getUserByUsername from "../../services/getUserByUsername";


export default function EditProfile() {

  const [image, setImage] = useState<any>()


  const imageRef = useRef<any>()


  const navigate = useNavigate()

  const context = useContext(UserCon)


  
  const [name, setName] = useState<string>()
  const [username, setUserName] = useState<string>()
  const [bio, setBio] = useState<string>()
  const {currentUser} = getAuth()

  const [error, setError] = useState('')

  useEffect(()=>{
    if(context?.user?.details){
      const {name:n, username:u, bio:b, } = context.user.details
      setName(n)
      setUserName(u)
      setBio(b)
    }
  }, [])

  if(!name||!username||bio==undefined){
    return null
  }

  const handleFileChange = (e: any) => {
    console.log('here', imageRef.current)
    const img = e.target.files
    if (img) {
      if (img[0]) {
        setImage(img[0])
        const reader = new FileReader()
        reader.onload = (e) => {
          if (imageRef.current != undefined) {
            console.log(imageRef.current, e.target?.result)
            imageRef.current.style.backgroundImage = `url(${e.target?.result})`
          }
        }
        reader.readAsDataURL(img[0])
      }
    }
  }

  const submit = async (e: any) => {
    e.preventDefault()
    if (context?.user?.id&&currentUser) {
      const docRef = doc(db, 'users', context.user.id)
      let link = context.user.details.avatar
      if (image) {
        const storage = getStorage()
        const filePath = `users/${context.user.details.id}/avatar`
        const storageRef = ref(storage, filePath)
        const res = await uploadBytes(storageRef, image)
        link = await getDownloadURL(res.ref)
        await updateProfile(currentUser, {
          photoURL: link
        })
      }
      await updateDoc(docRef, {
        ['details.bio']: bio,
        ['details.name']: name,
        ['details.avatar']: link,
      })

      let start = await getUserByUsername(username)
      if(start){
        setError('username is taken')
        setTimeout(()=>{
          setError('')
        }, 4000)
        return
      }
      await updateDoc(docRef,{
        ['details.username']: username,
      })
      navigate(`/profile/${username}`)
    }

  }

  return (
    <section>
      <header className="flex items-center border-b border-[#fff1] p-3 justify-between">
        <div className="flex gap-2 items-center">
          <Back click={() => navigate(-1)}
            className='w-[30px] h-[10px] ' />
          <h3 className="font-[700] text-[18px]">Edit Profile</h3>
        </div>
        <button className="bg-white text-black w-[100px] rounded-full p-1 font-[700] text-[18px]" onClick={submit}>
          Save
        </button>
      </header>
      <div className="relative h-[120px] w-full border-b border-[#fff1]">
        <div className="rounded-full outline outline-black absolute bottom-[-30px] left-[15px] w-[70px] h-[70px]">
          <div className="relative">
            <div style={{
              backgroundImage: `url(${avatar})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
              ref={imageRef}
           className='rounded-full outline outline-black w-[70px] h-[70px]'></div>
            <label htmlFor="avatar" className="absolute p-2 bg-[#0005] rounded-full top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
              <Icon src={camera} width='25px' height="25px" className="" />
              <input type='file' id="avatar" onChange={handleFileChange} className='hidden' />
            </label>
          </div>
        </div>
      </div>
      <form onSubmit={e => e.preventDefault()} className='mt-14 flex flex-col items-center gap-3'>
        {error&&<p className="text-red text-[12px]">{error}</p>}
        <Input
          name="Name"
          value={name}
          changeHandler={(e) => setName(e.target.value)}
          placeholder="full name"
          type="name"
          className="w-[90%]"
        />
        <Input
          name="Username"
          value={username}
          changeHandler={(e) => setUserName(e.target.value)}
          placeholder="username"
          type="username"
          className="w-[90%]"
        />
        <label htmlFor='bio' className={` h-[80px] border p-2 bg-transparent border-[#fff4] text-[#fff5] rounded-[5px] flex flex-col justify-start w-[90%]`}>
          Bio
          <textarea
            id='bio'
            name='bio'
            className={`h-[60px] w-[98%] placeholder-[#fff5] bg-transparent text-white text-[16px] resize-none text-wrap`}
            onChange={e => setBio(e.target.value)}
            value={bio}
          />
        </label>
      </form>
    </section>
  )
}