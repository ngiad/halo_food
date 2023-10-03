import React, { useState } from 'react'
import PostLayout from '../layout/PostLayout'
import style from "../styles/login.module.css"
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import axios from '../utils/axios'
import { toast } from 'react-toastify'
import { update } from '../redux/state'
import LoginCheck from '../src/LoginCheck'
import _debounce from 'lodash/debounce';

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: "",
    password: "",
    repassword: "",
    name: ""
  })

  const handChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }


  const handSubmit = async () => {
    try {
      if(!form.password || !form.repassword || !form.email || !form.name) return toast.warning("Nhap du thong tin")
      if(!(form.password === form.repassword)) return toast.warning("repassword != password")
      const res = await axios.post("auth/register", {
        ...form
      })

      if (res.data) {
        toast.success("register success!")
        dispatch(update(res.data))
        router.push("/profile")
      } else {
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
  return (
    <div className={style.login}>
      <h1>Đăng kí</h1>
      <form onSubmit={_handleSubmit}>
        <label htmlFor="email">Email</label>
        <input onChange={handChange} value={form.email} type="email" id='email' />
        <label htmlFor="password">Mật khẩu</label>
        <input onChange={handChange} value={form.password} type="password" id='password' />
        <label htmlFor="repassword">Nhập lại mật khẩu</label>
        <input onChange={handChange} value={form.repassword} type="password" id='repassword' />
        <label htmlFor="name">Tên người dùng</label>
        <input onChange={handChange} value={form.name} type="text" id='name' />
        <button>Đăng kí</button>
      </form>
    </div>
  )
}

const Usage = (props : any) => {
  const Wap = LoginCheck(Register,{...props},"/profile")
  return  <Wap />
}

Usage.layout = PostLayout

export default Usage