import React, { memo, useEffect, useCallback, useMemo } from 'react'
import _debounce from 'lodash/debounce';
import style from "../styles/content.module.css"
import Link from 'next/link';
import Loading from './Loading';


const Container = ({ data, handleScroll,isLoading, ...props }: any) => {
  const scrollEvent = _debounce(handleScroll, 300)
  const eventScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      scrollEvent()
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", eventScroll);
    return () => {
      window.removeEventListener("scroll", eventScroll);
    };
  }, [])

  const render = useMemo(() => {
    return <>
      {
        data?.map((item: any, index: number) => {
          if (!index) {
            return <div key={item["_id"]} className={style["item-1"]}>
              <Link href={`${item["_id"]}`} className={style["card"]}>
                <div style={{backgroundImage : `url(${item.content[0].image})`}} className={style["thumb"]}></div>
                <article>
                  <h1>{item.namePost}</h1>
                  <p>{item.content[0].p}</p>
                  <span>{item.athor}</span>
                </article>
              </Link>
              {
                props.admin && <><button onClick={() =>  props.handleRemovePost(item["_id"])} className={style["btnAdmin"]}>Remove</button> <button onClick={() =>  props.handleUpdatePost(item["_id"])} className={style["btnAdmin"]}>Update</button></>
              }
            </div>
          } else {
            return <div key={item["_id"]} className={style["item-2"]}>
              <Link href={`${item["_id"]}`} className={style["card"]}>
                <div style={{backgroundImage : `url(${item.content[0].image})`}} className={style["thumb"]}></div>
                <article>
                  <h1>{item.namePost}</h1>
                  <p>{item.content[0].p}</p>
                  <span>{item.athor}</span>
                </article>
              </Link>
              {
                props.admin && <><button onClick={() =>  props.handleRemovePost(item["_id"])} className={style["btnAdmin"]}>Remove</button> <button onClick={() =>  props.handleUpdatePost(item["_id"])} className={style["btnAdmin"]}>Update</button></>
              }
            </div>
          }
        })
      }</>
  }, [data])


  return (
    <div>
      <div className={style["band"]} style={{gap : `${props.admin ? "30px" : ""}`}}>
        {data?.length ? render : "Không có bài viết"}
      </div>
      {isLoading && <Loading />}
    </div>
  )
}

export default memo(Container) 