import { ReactComponentElement } from 'react'
import MainLayout from '../layout/MainLayout'
import ReduxProvider from '../src/ProviderRedux'
import '../styles/globals.css'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
  const Layout = Component.layout || MainLayout
  return <ReduxProvider><Layout><Component {...pageProps} /></Layout></ReduxProvider> 
}
