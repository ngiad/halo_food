import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from "../styles/post.module.css"
import PostLayout from '../layout/PostLayout';
import axios from '../utils/axios';
import styleTag from "../styles/search.module.css"
import { toast } from 'react-toastify';
import useCallApi from '../src/useCallApi';
import { useSelector } from 'react-redux';
import { userTP } from '../redux/store';
import _debounce from 'lodash/debounce';
import { AiFillDelete, AiFillSave } from 'react-icons/ai';


type post = {
  namePost: string,
  content: Array<any>,
  athor: string,
  tag: Array<string>
  view: number,
  status: string,
  updatedAt: any
}

const postPage: NextPage & { layout: any } = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state: userTP) => state.user)
  const [callGetData, loading] = useCallApi()

  const [saveStatus, setSaveStatus] = useState<Boolean>(false)
  const [data, setData] = useState<post>({
    namePost: "",
    content: [],
    athor: "",
    tag: [],
    view: 0,
    status: "",
    updatedAt: ""
  }
  )

  const getData = async () => {
    try {
      const cbdata = await callGetData(async (): Promise<any> => {
        try {
          const res = await axios.get(`post/${id}`)
          return res.data
        } catch (error) {
          return error
        }
      })
      setData(cbdata);
    } catch (error) {
      toast.error("some think error!");
    }
  }

  const checkStatusSave = async () => {
    if (!user.token) return
    try {
      const res = await axios.get(`profile/savestatus?iduser=${user['_id']}&idPost=${id}`, {
        headers: {
          token: user.token
        }
      })
      setSaveStatus(res.data.status)
    } catch (error) {
      toast.error("some think error!");
    }
  }

  useEffect(() => {
    if (id) {
      checkStatusSave()
      getData()
    }
  }, [id])


  const handleClicktag = (tag: string) => {
    router.push({ pathname: "/search", query: { tag } })
  }

  const handleAddSave = async () => {
    if (!user.token) return router.push("/login")
    try {
      const cbdata = await callGetData(async () => {
        try {
          const res = await axios.post("profile/addsave", { iduser: user?.["_id"], idPost: id }, {
            headers: {
              token: user.token
            }
          })
          return res.data
        } catch (error) {
          return error
        }
      });

      if (cbdata?.status) toast.success("save done!")
      else toast.success("remove done!")
      setSaveStatus(cbdata?.status)
    } catch (error) {
      toast.error("some think error!");
    }
  }

  const handleUpdate = () => {
    if(id) router.push(`admin/update/${id}`)
  }

  const _handleAddSave = _debounce(handleAddSave, 300)
  return (
    <div className={style.postPage}>
      <div onClick={_handleAddSave} className={style.savebtn}>{saveStatus ? <AiFillDelete /> : <AiFillSave />} </div>
      <div className={style.content}>
        <div className={style.top}>
          <h1>{data?.namePost}</h1>
          <span>tác giả : {data?.athor.toUpperCase()} / {data?.updatedAt.toLocaleString()}</span>
          <ul style={{ margin: "20px 0", listStyle: "none", display: "flex", gap: "6px" }}>
            {
              data?.tag?.map((item, index) => {
                return <li onClick={() => handleClicktag(item)} style={{ display: "flex", justifyContent: "center", background: "#ccc", margin: "0" }} className={styleTag.btnTag} key={index}>#{item}</li>
              })
            }
          </ul>
          {
            user.admin && (<><button onClick={handleUpdate} style={{ background: "blue", color: "#fff", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: "8px" }}>Update</button></>)
          }
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