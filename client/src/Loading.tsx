import React, { memo } from 'react'
import style from "../styles/loading.module.css"


const Loading = () => {
  return (
    <div className={style["wrapper"]}>
      <div className={style["circle"]}></div>
      <div className={style["circle"]}></div>
      <div className={style["circle"]}></div>
      <div className={style["shadow"]}></div>
      <div className={style["shadow"]}></div>
      <div className={style["shadow"]}></div>
    </div>
  )
}

export default memo(Loading) 