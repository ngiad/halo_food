import React,{ ReactNode } from 'react'
import { Provider } from "react-redux"
import state from "../redux/store"


type prop = {
    children: ReactNode;
};


const ReduxProvider = ({children} : prop) => {

  return (
    <Provider store={state} >{children}</Provider>
  )
}

export default ReduxProvider