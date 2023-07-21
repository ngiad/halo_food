import React, { memo } from 'react'
import style from "../styles/loading.module.css"


const Loading = () => {
  return (
    <div className={style.loading}></div>
  )
}

export default memo(Loading) 