import { useCallback, useEffect, useMemo, useRef, useState,useContext } from "react";
import Container from "../src/Container";
import axios from "../utils/axios";
import _debounce from 'lodash/debounce';
import { SearchContext } from "../src/SearchContext";


const search = () => {
  const totalPage = useRef<Number>(0)
  const [fetch, setFetch] = useState({
    error: null,
    data: [],
    isLoading: false,
    lengthPage: 0
  })
  const {Countsearch} = useContext(SearchContext)

  const getData = async () => {
    let hrel : String = `post?page=${totalPage.current}&${window.location.href.split("?")[1]}`
    setFetch(prev => prev = { ...prev, isLoading: true })
    try {
      const res = await axios.get(hrel)
      const data = await res.data

      setFetch(prev => {
        let newState = { ...prev, data: [ ...data[0]], lengthPage: data[1], isLoading: false }
        return newState
      })
    } catch (error) {
      setFetch({ ...fetch, error })
    }
  }


  const handleGetDate = _debounce(getData, 300)

  useEffect(() => {
    handleGetDate()
    totalPage.current = 0
  }, [Countsearch])


  const render = (() => fetch.data?.map((item: any) => {
    return { ...item, updatedAt: new Date(item.updatedAt).toLocaleString() }
  }))()

  const getDataIsMouse = async (hrel) => {
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
  const handleGetData = _debounce(getDataIsMouse, 300)


  const handleScroll = useCallback(function () {
    if (!fetch.isLoading && totalPage.current <= ((fetch.lengthPage / 12) + 1)) {
      totalPage.current++
      let hrel : String = `post?page=${totalPage.current}&${window.location.href.split("?")[1]}`
      handleGetData(hrel)
    }
  }, [])

  return (
    <>
      <Container data={render} handleScroll={handleScroll} isLoading={fetch.isLoading} />
    </>
  )
}

export default search