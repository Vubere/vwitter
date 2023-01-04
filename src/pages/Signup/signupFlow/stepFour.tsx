import React, { useContext, useEffect, useRef, useState } from 'react'


import Back from "../../../components/Back"
import Input from "../../../components/input"
import Avatar from '../../../components/icon'
import FlowButton from './button'

import avatar from '../../../assets/avatar.jpg'
import camera from '../../../assets/cameraBlack.png'
import Cancel from '../../../components/CancelIcon'
import { FlowContext } from '.'
import { UserCon } from '../../../context/UserContext'
import { doc, updateDoc } from 'firebase/firestore'


import { uploadBytes, ref, getStorage, getDownloadURL } from 'firebase/storage'
import { setDoc } from 'firebase/firestore'
import {
  getAuth, reauthenticateWithCredential, updateProfile,
  EmailAuthProvider, updateEmail, updatePassword
} from 'firebase/auth'
import { db } from '../../../main'
import { useNavigate } from 'react-router-dom'
import Load from '../../../components/load'




export default function stepFour({ close }: {
  close: () => void
}) {
  const { details, setDetails } = useContext(FlowContext)
  const userCon = useContext(UserCon)
  const auth = getAuth()


  const [ava, setAva] = useState<any>(undefined)

  const imageRef = useRef<any>()
  const fileRef = useRef<any>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)



  const handleFileChange = (e: any) => {
    const file = e.target.files
    if (file) {
      setAva(file[0])
      if (file[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (imageRef.current != undefined) {
            imageRef.current.style.backgroundImage = `url(${e.target?.result || ''})`
          }
        }
        reader.readAsDataURL(file[0])
      }
    }
  }

  const updateAvatar = async () => {

    const storage = getStorage();
    try {
      if (ava != undefined)
        if (!ava.type.includes('image')) {
          throw 'You can only send images or videos.'
        }
      if (auth.currentUser != null) {
        if (ava) return
        const filePath = `users/${auth.currentUser.uid}/avatar`
        const storageRef = ref(storage, filePath)
        let path = ''

        const res = await uploadBytes(storageRef, ava)
        path = await getDownloadURL(res.ref)
        const docRef = doc(db, 'users', auth.currentUser.uid)
        await setDoc(docRef, {
          ['details.avatar']: path
        }, { merge: true })
        updateProfile(auth.currentUser, {
          photoURL: path
        })
        if (userCon) {
          if (userCon.user)
            userCon.setUser({ ...userCon.user, details: { ...userCon.user.details, avatar: path } })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateUsername = async () => {
    if (auth.currentUser) {
      try {
        const docRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(docRef, {
          ['details.username']: details.username,
        })
        await updateProfile(auth.currentUser, {
          displayName: details.username,
        })
        if (userCon) {
          if (userCon.user) {
            userCon.setUser({
              ...userCon.user, details: {
                ...userCon.user.details,
                username: details.username
              }
            })
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }


  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      setLoading(true)
      await updateUsername()
      if (ava)
        await updateAvatar()
      done()
      setLoading(false)
    })()

  }
  const done = () => {
    close()
    navigate('/home')
  }

  if (loading) {
    return <Load />
  }

  return (
    <div className='flex flex-col'>
      <div className="flex items-center mt-4 ml-4">
        <Cancel onClick={done} className='m-2' />
        <p> Step 4 of 4</p>
      </div>

      <h3 className='w-[90%] ml-auto mr-auto mt-8 font-[700] text-[22px]'>Pick Username and Profile Picture</h3>
      <form onSubmit={submit}
        className="w-[90%] flex flex-col items-center mr-auto ml-auto">

        <Input
          type="username"
          name="Username"
          placeholder=""
          value={details.username}
          changeHandler={e => setDetails({ ...details, username: e.target.value })}
          className="mt-8" />
        <label htmlFor="file"
          className='w-[120px] block mt-8 ml-auto mr-auto rounded full relative'>
          <div>
            <img src={camera} alt="camera icon"
              className='absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]' />
            <div className='w-[80px] h-[80px]'
              ref={imageRef}
              style={{
                backgroundImage: avatar,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}></div>
          </div>
          <input type="file" name="profile" id="file"
            ref={fileRef}
            onChange={handleFileChange}
            className="hidden" />
        </label>
        <FlowButton className='w-[86%] fixed bottom-[15px]'>
          Complete
        </FlowButton>
      </form>
    </div>
  )
}