import React, { useEffect, useMemo, useState } from 'react'
import PostLayout from '../layout/PostLayout'
import { useDispatch, useSelector } from 'react-redux'
import { userTP } from '../redux/store'
import { useRouter } from 'next/router'
import style from "../styles/profile.module.css"
import axios from '../utils/axios'
import { toast } from 'react-toastify'
import PostSave from '../src/PostSave'
import Link from 'next/link'
import { BiLogOut } from 'react-icons/bi';
import { GrUserAdmin } from "react-icons/gr"
import { update } from '../redux/state'

const Profile = () => {
  const user = useSelector((state: userTP) => state.user)
  const dispatch = useDispatch()
  const navigate = useRouter()
  const [save, setSave] = useState([])
  const [havePost,setHavePost] = useState(false)

  const getSaveData = async () => {
    try {
      const res = await axios.get(`profile?page=${navigate.query?.page}`, {
        headers: {
          token: user.token
        }
      })
      const data = await res.data
      if(data[0]?.length) setHavePost(true)
      else{
        setHavePost(false) 
        navigate.back()
      } 

      setSave(data)
    } catch (error) {
      toast.warning("some think error!")
    }
  }

  useEffect(() => {
    if (!user.token) navigate.push("/login")
    if(navigate.query?.page) getSaveData()
  }, [navigate.query?.page])

  const handleRemove = (id) => {
    setSave([save[0].filter((item) => item.idPost !== id), save[1]])
  }

  const handleLogout = () => {
    dispatch(update({}))
    navigate.push("/login")
  }

  const rederPaginagate = useMemo(() => {
    let output = []
    for (let index = 0; index <= (save[1]/12); index++) {
      output.push(index)
    }
    return output.map((item,index) => <Link className={`${navigate.asPath.includes(`${index}`) && style.active}`} href={`/profile?page=${item}`} key={index}>{item + 1}</Link>)
  },[save])


  return (
    <div className={style.Profile}>
      <button onClick={handleLogout} style={{ position: "fixed", right: "20px", top: "240px", width: "36px", height: "36px", lineHeight: "100%", cursor: "pointer" }}><BiLogOut /></button>
      <div className={style.top}>
        <img src={user.photo} alt="avatar" />
        <h1>{user.name}</h1>
      </div>

      <div className={style.save}>
        {
          user.admin && <Link className={style.toadmin} href={"/admin"}><GrUserAdmin /></Link>
        }
        <h1 style={{ marginBottom: "40px", color: "#000" }}>Danh sách bài viết được lưu </h1>
        {
          havePost ?
            (
              save[0]?.map((item: any) => <PostSave handleRemove={handleRemove} key={item["_id"]} post={item.idPost} />)
            ) : <h2>Không có bài viết được lưu</h2>
        }
      </div>
      <div className={style.pagination}>
        {
          rederPaginagate
        }
      </div>
    </div> )
}

Profile.layout = PostLayout

export default Profile