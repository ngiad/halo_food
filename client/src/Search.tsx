import React, { memo, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import style from "../styles/search.module.css";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const TagELE = useRef<HTMLDivElement>();

  const [positionmouse, setPositionMouse] = useState<Number>(0);
  const [search, setSearch] = useState<String>("");
  const [listTag, setListTag] = useState<Array<any>>([]);

  let listTap = [
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
    "test",
    "hello",
    "thit lon",
  ];

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
    console.log(" log:::",{...router.query,...query})
    router.push({ href: router.pathname, query });
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
  },[router.pathname])

  
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
