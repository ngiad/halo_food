import React, { useState } from 'react'
import PostLayout from '../layout/PostLayout'
import style from "../styles/login.module.css"
import axios from '../utils/axios'
import { useDispatch } from 'react-redux'
import { update } from '../redux/state'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import LoginCheck from '../src/LoginCheck'
import _debounce from 'lodash/debounce';


const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form, setForm] = useState({ 
    email: "",
    password: ""
  })

  const handChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }


  const handSubmit = async () => {
    try {
      const { email , password } = form

      if(!email || !password) throw new Error("them du thong tin")
      const res = await axios.post("auth/login", {
        ...form
      })

      if (res.data) {
        toast.success("login success!")
        dispatch(update(res.data))
        router.push("/profile")
      }else{
        throw new Error("some think error!")
      }
    } catch (error : any) {
      toast.error(error.message);
    }
  }


  const _handleSubmit = (e :  any) =>{
    e.preventDefault()
    _debounce(handSubmit,300)()
  } 
  return <div className={style.login}>
    <h1>Đăng nhập</h1>
    <form onSubmit={_handleSubmit}>
      <label htmlFor="email">Email</label>
      <input onChange={handChange} value={form.email} type="text" id='email' />
      <label htmlFor="password">Mật khẩu</label>
      <input onChange={handChange} value={form.password} type="password" id='password' />
      <button>Đăng nhập</button>
    </form>
  </div>
}


 

const Usage = (props : any) => {
  const Wap = LoginCheck(Login,{...props},"/profile")
  return  <Wap />
}

Usage.layout = PostLayout

export default Usage