import { useEffect } from "react";
import Container from "../src/Container";
import useFetch from "../src/useFetch";

const New = () => {
  const { handleScroll, render, handleGetDate, total, fetch } = useFetch()

  useEffect(() => {
    let hrel = `post?page=${total}&status=new`
    handleGetDate(hrel)
  }, [total])

  return (
    <div>
      <Container data={render} handleScroll={handleScroll} isLoading={fetch.isLoading} />
    </div>
  )
}

export default New