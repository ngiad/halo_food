import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from "../styles/post.module.css"
import PostLayout from '../layout/PostLayout';
import axios from '../utils/axios';
import styleTag from "../styles/search.module.css"

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

  const handleClicktag = (tag : string) => {
    router.push({pathname : "/search",query : tag})
  }

  return (
    <div className={style.postPage}>
      <div className={style.content}>
        <div className={style.top}>
          <h1>{data?.namePost}</h1>
          <span>{data?.athor}</span>
          <ul style={{ listStyle: "none", display: "flex", gap : "6px" }}>
            {
              data?.tag.map((item, index) => {
                return <li onClick={() => handleClicktag(item)} style={{ display: "flex", justifyContent: "center",background : "#ccc", margin : "0" }} className={styleTag.btnTag} key={index}>#{item}</li>
              })
            }
          </ul>
        </div>
        <div className={style.bottom}>
          {
            data?.content?.map((item, index) => {
              return <div key={index}>
                <p >{item.p}</p>
                <img src={item.image} alt="anh nau an" />
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}
postPage.layout = PostLayout

export default postPage