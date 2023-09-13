import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from "../styles/post.module.css"
import PostLayout from '../layout/PostLayout';
import Cmt from '../src/Cmt';
import axios from '../utils/axios';


const postPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query

  const [data, setData] = useState()

  const getData = async (postid: String) => {
    try {
      const res = await axios.get(`post/${postid}`)
      const data = await res.data
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      getData(id)
    }
  }, [id])

  return (
    <div className={style.postPage}>
      <div className={style.content}>
        <div className={style.top}>
          <h1>{data?.namePost}</h1>
          <span>{data?.athor}</span>
          <ul>
            {
              data?.tag.map((item, index) => {
                return <li key={index}>{item}</li>
              })
            }
          </ul>
        </div>
        <div className={style.bottom}>
          {
            data?.content?.map((item, index) => {
              return <div key={index}>
                <p >{item.p}</p>
                <img  src={item.image} alt="anh nau an" />
              </div>
            })
          }
        </div>

        <div className={style.youthink}>
          <form>
            <input type="text" placeholder='Viết suy nghĩ của bạn ...' />
            <button>Gửi</button>
          </form>
        </div>
      </div>
      <div className={style.cmt}>
        <h2>Bình luận</h2>
        <Cmt />
        <Cmt />
        <Cmt />
        <Cmt />
        <Cmt />
      </div>
    </div>
  )
}
postPage.layout = PostLayout

export default postPage