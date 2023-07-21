import React from 'react'
import PostLayout from '../layout/PostLayout'
import style from "../styles/login.module.css"


const Login = () => {
  return <div className={style.login}> 
      <h1>Đăng nhập</h1>
      <form>
        <label htmlFor="username">Tên đăng nhập</label>
        <input type="text" id='username' />
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id='password' />
        <button>Đăng nhập</button>
      </form>
  </div>
}


Login.layout = PostLayout

export default Login