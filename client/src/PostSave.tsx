import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../utils/axios'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { userTP } from '../redux/store'
import style from "../styles/profile.module.css"
import { AiFillDelete } from 'react-icons/ai';

const PostSave = ({ post,handleRemove }: any) => {
    const user = useSelector((state: userTP) => state.user)
    const [postSave, setPostSave] = useState()

    const getPost = async () => {
        try {
            const res = await axios.get(`post/${post}`)
            const data = res.data
            setPostSave(data)
        } catch (error) {
            toast.warning("some think error!")
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    const handClick = async () => {
        try {
            const res = await axios.post('profile/addsave', { iduser: user["_id"], idPost: post }, {
                headers: {
                    token: user.token
                }
            })

            const data = await res.data

            if (data.complete){
                handleRemove(post)
                toast.success("unsave post done!")
            } 
            else throw new Error("loi cmnr")
        } catch (error) {
            toast.warning("some think error!")
        }
    }

    return (
        <div className={style["blog-container"]}>
        <div className={style["blog-body"]}>
          <div className={style["blog-title"]}>
            <h1><Link href={`/${postSave?._id}`}>{postSave?.namePost}</Link></h1>
          </div>
          <div className={style["blog-summary"]}>
            <p>{postSave?.content[0].p}</p>
          </div>
          <div className={style["blog-tags"]}>
            <ul>
                {
                    postSave?.tag.map((item,index) => {
                        return  <li key={index}><Link href={`/search?tag=${item}`}>{item}</Link></li>
                    })
                }
            </ul>
          </div>
        </div>
        <div style={{
            display : "flex",
            justifyContent : "flex-end"
        }}>
            <button onClick={handClick} className={style["Btnremove"]} style={{cursor : "pointer"}}><AiFillDelete/></button>
        </div>
      </div>

    )
}

export default PostSave