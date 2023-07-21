import React, { useReducer, useEffect } from 'react'
import axios from '../utils/axios'

const initState = {
    isLoading: false,
    data: null,
    error: null
}


const handLeFetch = (state?: any, action?: any) => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, isLoading: true }
        case "FETCH_SUCCESS":
            return { ...state, data: action.data, error: null, isLoading: false }
        case "FETCH_ERROR":
            return { ...state, isLoading: false, error : action.error }
        default:
            return { ...state }
    }
}

const useFetch = (href: string) => {
    const [fetch, dispatch] = useReducer(handLeFetch, initState);

    const getData = async () => {
        dispatch({ type: "FETCH_START"})
        try {
            const res = await axios.get(href)
            const data = res.data
            dispatch({ type: "FETCH_SUCCESS",data})
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", error })
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return fetch
}

export default useFetch