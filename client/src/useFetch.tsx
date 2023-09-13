import {  useRef, useState,useMemo,useCallback } from 'react'
import axios from '../utils/axios'
import _debounce from 'lodash/debounce';

const useFetch = () => {
    const totalPage = useRef<Number>(0)
    const [total, setTotal] = useState(0)
    const [fetch, setFetch] = useState({
      error: null,
      data: [],
      isLoading: false,
      lengthPage: 0
    })
    const getData = async (hrel : any) => {
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

  
    const render = useMemo(() => fetch.data?.map((item: any) => {
      return { ...item, updatedAt: new Date(item.updatedAt).toLocaleString() }
    }), [fetch])
  
  
    const handleScroll = useCallback(function () {
      if (!fetch.isLoading && totalPage.current <= ((fetch.lengthPage / 12) + 1)) {
        totalPage.current++
        setTotal(totalPage.current)
      }
    }, [])
  

    return {handleScroll,render,handleGetDate,total,fetch}
}

export default useFetch