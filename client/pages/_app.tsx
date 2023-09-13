import MainLayout from '../layout/MainLayout'
import ReduxProvider from '../src/ProviderRedux'
import SearchContextProvider from '../src/SearchContext';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React,{ ReactElement } from 'react';



export default function App({ Component, pageProps }: AppProps) : ReactElement {
  const Layout = Component.layout || MainLayout
  return <ReduxProvider><SearchContextProvider><Layout> <Component {...pageProps} /></Layout></SearchContextProvider></ReduxProvider> 
}
