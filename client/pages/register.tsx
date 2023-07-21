import React from 'react'
import PostLayout from '../layout/PostLayout'
import style from "../styles/login.module.css"

const Register = () => {
  return (
    <div className={style.login}> 
      <h1>Đăng kí</h1>
      <form>
        <label htmlFor="username">Tên đăng nhập</label>
        <input type="text" id='username' />
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id='password' />
        <label htmlFor="repassword">Nhập lại mật khẩu</label>
        <input type="password" id='repassword' />
        <label htmlFor="name">Tên người dùng</label>
        <input type="text" id='name' />
        <label htmlFor="password">Email</label>
        <input type="email" id='email' />
        <button>Đăng kí</button>
      </form>
  </div>
  )
}

Register.layout = PostLayout

export default Register