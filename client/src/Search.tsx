import React, { memo, useEffect, useRef, useState, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import style from "../styles/search.module.css";
import { useRouter } from "next/router";
import { SearchContext } from "./SearchContext";
import axios from "../utils/axios";
import { toast } from "react-toastify";

const Search = () => {
  const router = useRouter();
  const TagELE = useRef<HTMLDivElement>();
  const [positionmouse, setPositionMouse] = useState<Number>(0);
  const [search, setSearch] = useState<String>("");
  const [listTag, setListTag] = useState<Array<any>>([]);
  const { setCountsearch } = useContext(SearchContext)

  let [listTap,setListTap] = useState([])

  const getTag  = async(): Promise<void> => {
    try {
      const res = await axios.get("post/tag")
      setListTap(res.data)
    } catch (error) {
      toast.warning("disconnent tag!")
    }
  }

  const handlEmousedown = (event: Event): void => {
    event.stopPropagation();
    setPositionMouse(event.clientX);
  };

  const handleEmouseUp = (event: Event): void => {
    event.stopPropagation();
    TagELE.current?.scrollTo({
      left: TagELE.current?.scrollLeft + (positionmouse - event.clientX),
    });
  };

  const routerQuery = (query: { search?: String; tag?: any[] }) => {
    if (!query.search) delete query.search;
    if (!query.tag?.length) delete query.tag;
    router.push({ pathname: "/search", query })
    setCountsearch(prev =>{
      return prev+=1
    })
  };

  const handleSubmit = (e: Event): void => {
    e.preventDefault();
    routerQuery({ search: search, tag: listTag });
  };

  const createClassNameBtn = (tag: String) => {
    return router.query.tag?.includes(tag);
  };

  const handleClicktag = (item: String) => {
    if (listTag?.find((tag: any) => tag === item)) {
      let newState = listTag.filter((tag) => tag !== item)
      setListTag(newState)
      routerQuery({
        search: search,
        tag: newState
      })
    }
    else {
      let newState = [...listTag, item]
      setListTag(newState)
      routerQuery({ search: search, tag: newState });
    }
  };

  useEffect(() => {
    setListTag([])
    setSearch("")
  }, [router.pathname])

  useEffect(() =>{
    getTag()
  },[])
  return (
    <div className={style.search}>
      <form onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={(e: Event): void => setSearch(e.target.value)}
          placeholder="search ..."
          type="text"
        />
        <button>
          <AiOutlineSearch />
        </button>
      </form>

      <div
        onMouseDown={handlEmousedown}
        onMouseUp={handleEmouseUp}
        ref={TagELE}
        className={style.tag}
      >
        {listTap.map((item, index) => {
          return (
            <div key={index}>
              <button
                style={{
                  backgroundColor: createClassNameBtn(item) && "#cac0c0",
                  color: createClassNameBtn(item) && "#fff",
                }}
                onClick={() => handleClicktag(item)}
                className={style.btnTag}
              >
                #{item}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Search);
