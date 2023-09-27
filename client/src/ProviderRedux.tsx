import React, { ReactNode } from 'react'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/persist';
import Loading from './Loading';


type prop = {
  children: ReactNode;
};


const ReduxProvider = ({ children }: prop) => {

  return (
    <Provider store={store} >
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider