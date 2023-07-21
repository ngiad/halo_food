import { useRouter } from "next/router"
import { useEffect } from "react";
import Container from "../src/Container";
import useFetch from "../src/useFetch";


function Home() {
  const router = useRouter()


  useEffect(() => {
    console.log(router.query);
    console.log(router.asPath);
  }, [router])

  const fetch = useFetch("1")

  console.log("fetch ::: ",fetch)
  return (
    <>
      <Container />
    </>
  )
}


export default Home