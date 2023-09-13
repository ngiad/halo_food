import React, { useState } from 'react'
import PostLayout from '../layout/PostLayout'
import style from "../styles/login.module.css"
import axios from '../utils/axios'
import { useDispatch } from 'react-redux'
import { update } from '../redux/state'
import { useRouter } from 'next/router'


const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form,setForm] = useState({
    email : "",
    password : ""
  })

  const handChange =(e) => {
    setForm({...form,[e.target.id] : e.target.value})
  }


  const handSubmit = async(e : any) =>{
    e.preventDefault()
    try {
      const res = await axios.post("auth/login",{
          ...form
      },{
        headers : {
          "isadmin" : "true"
        }
      })

      if(res.data){        
        dispatch(update(res.data))
        router.push("/profile")
      }

      
    } catch (error) {
      console.log(error);
      
    }
  }
  return <div className={style.login}> 
      <h1>Đăng nhập</h1>
      <form onSubmit={handSubmit}>
        <label htmlFor="email">Email</label>
        <input onChange={handChange} value={form.email} type="text" id='email' />
        <label htmlFor="password">Mật khẩu</label>
        <input onChange={handChange} value={form.password} type="password" id='password' />
        <button>Đăng nhập</button>
      </form>
  </div>
}


Login.layout = PostLayout

export default Login