import React, { useEffect } from 'react'
import PostLayout from '../layout/PostLayout'
import { useSelector } from 'react-redux'
import { userTP } from '../redux/store'
import { useRouter } from 'next/router'

const Profile = () => {
  const user = useSelector((state : userTP) => state.user)
  const navigate = useRouter()

  useEffect(() => {
    if(!user.token) navigate.push("/login")
  },[])

  return (
    <div>Profile :  {user.name}</div>
  )
}

Profile.layout = PostLayout

export default Profile