import React, { useEffect } from 'react'
import PostLayout from '../layout/PostLayout'
import { useSelector } from 'react-redux'
import { userTP } from '../redux/store'
import { useRouter } from 'next/router'
import axios from '../utils/axios'

const Profile = () => {
  const user = useSelector((state: userTP) => state.user)
  const navigate = useRouter()

  useEffect(() => {
    if (!user.token) navigate.push("/login")

    fetch("http://localhost:5000/api/post/64e5c78015643d56be02fb90").then((res) => res.json()).then((data) => console.log(data)
    )
  }, [])

  return (
    <div>Profile :  {user.name}</div>
  )
}

Profile.layout = PostLayout

export default Profile