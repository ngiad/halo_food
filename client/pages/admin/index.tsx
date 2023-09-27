import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PostLayout from '../../layout/PostLayout'
import Link from 'next/link'
import axios from "../../utils/axios";
import _debounce from 'lodash/debounce';
import style from "../../styles/admin.module.css"
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Container from '../../src/Container';
import { toast } from 'react-toastify';

const Admin = () => {
  const router = useRouter()
  const user = useSelector((state) => state.user)

  const totalPage = useRef<Number>(0)
  const [total, setTotal] = useState(0)
  const [fetch, setFetch] = useState({
    error: null,
    data: [],
    isLoading: false,
    lengthPage: 0
  })
  const getData = async (hrel: any) => {
    setFetch(prev => prev = { ...prev, isLoading: true })
    try {
      const res = await axios.get(hrel)
      const data = await res.data

      setFetch(prev => {
        let newState = { ...prev, data: [...prev.data, ...data[0]], lengthPage: data[1], isLoading: false }
        return newState
      })
    } catch (error) {
      setFetch({ ...fetch, error })
    }
  }


  const handleGetDate = _debounce(getData, 300)
  useEffect(() => {
    // if(!user.admin){
    //   router.push("/")
    // }

    let hrel = `post?page=${total}`
    handleGetDate(hrel)
  }, [total])


  const render = useMemo(() => fetch.data?.map((item: any) => {
    return { ...item, updatedAt: new Date(item.updatedAt).toLocaleString() }
  }), [fetch])


  const handleScroll = useCallback(function () {
    if (!fetch.isLoading && totalPage.current <= ((fetch.lengthPage / 12) + 1)) {
      totalPage.current++
      setTotal(totalPage.current)
    }
  }, [])


  const handleUpdatePost = (id :any) => {
    router.push(`admin/update/${id}`)
  }

  const handleRemovePost = async (id : any) => {
    try {
      const res = await axios.delete(`post/remove/${id}`,{
        headers : {
          isadmin : true
        }
      })
      const data = res.data

      if(data.complete){
        setFetch(prev =>{
          return {...prev,["data"] : prev.data.filter(item => item["_id"] !== id)}
        })
        toast.success("remove done!")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className={style.admin}>
      <div className={style.top}>
        <Link href="admin/create">Create</Link>
      </div>
      <div className={style.posts}>
        <Container handleRemovePost={handleRemovePost} handleUpdatePost={handleUpdatePost} admin={true} data={render} handleScroll={handleScroll} isLoading={fetch.isLoading} />
      </div>
    </div>
  )
}

Admin.layout = PostLayout

export default Admin