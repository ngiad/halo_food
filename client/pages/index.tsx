import Container from "../src/Container";
import _debounce from 'lodash/debounce';
import useFetch from "../src/useFetch";
import {useEffect} from "react"
function Home() {
  const  {handleScroll,render,handleGetDate,total,fetch} = useFetch()

  useEffect(() => {
    let hrel = `post?page=${total}`
    handleGetDate(hrel)
  }, [total])

  return (
    <>
      <Container data={render} handleScroll={handleScroll} isLoading={fetch.isLoading} />
    </>
  )
}


export default Home