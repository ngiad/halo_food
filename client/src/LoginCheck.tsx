import { useRouter } from 'next/router'
import React,{ memo } from 'react'
import { useSelector } from 'react-redux'
import { userTP } from '../redux/store'

const LoginCheck = (Component : any ,props : any,navigator : string) => {
  const WrapperComponent = () => {
    const user = useSelector((state : userTP) => state.user)
    const router = useRouter()

    if(user.token) router.push(navigator)
    else return <Component {...props} />
  }

  return memo(WrapperComponent)
}

export default LoginCheck