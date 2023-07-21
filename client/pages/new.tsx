import { useRouter } from 'next/router';
import React,{ useEffect } from 'react'
import Container from '../src/Container';

const New = () => {
  const router = useRouter()


  useEffect(() => {
    console.log(router.query);
    console.log(router.asPath);
  },[router])
  
  return (
    <div>
      <Container />
    </div>
  )
}

export default New