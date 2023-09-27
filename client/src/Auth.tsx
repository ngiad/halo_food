import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { update } from '../redux/state'
type AuthProps = {
  children: ReactNode;
};

const Auth = ({children} : AuthProps) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || '{}') : {}
    dispatch(update(user))
  },[])


  return (
    <>{children}</>
  )
}

export default Auth