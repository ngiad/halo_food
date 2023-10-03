import { ToastContainer } from 'react-toastify';
import MainLayout from '../layout/MainLayout'
import ReduxProvider from '../src/ProviderRedux'
import SearchContextProvider from '../src/SearchContext';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';


export default function App({ Component, pageProps }: AppProps & { Component: { layout: any } }): ReactElement {
  const Layout = Component.layout || MainLayout
  return <ReduxProvider><SearchContextProvider><Head><title>1001 công thức</title></Head><NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} /><Layout> <Component {...pageProps} /></Layout></SearchContextProvider><ToastContainer /></ReduxProvider>
}
