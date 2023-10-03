import React, { useState, useMemo, useCallback, useEffect } from 'react';
import style from "../../../styles/adminCreate.module.css"; // Import your CSS module
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../../utils/axios';
import { error } from 'console';

const ContentItem = React.memo(({i, item, updateContent, removeContent }) => {

  const handLeChange = (e) => {
    updateContent(i, { ...item, [e.target.name]: e.target.value })
  }

  const handleRemove = () => {
    removeContent(i);
  }

  return (
    <div className={style.contentItem} key={item.id}>
      <label>Image : </label>
      <input
        className={style.input}
        onChange={handLeChange}
        name='image'
        type="text"
        value={item.image}
      />
      <label>Content : </label>
      <textarea
        className={style.input}
        onChange={handLeChange}
        name='p'
        type="text"
        value={item.p}
      />
      <button onClick={handleRemove}>Xóa</button>
    </div>
  );
});

const Update = () => {
  const router = useRouter()
  const user = useSelector(state => state.user)

  const [namePost, setNamePost] = useState("");
  const [content, setContent] = useState([{ p: "", image: "", id: 1 }]);
  const [tag, setTag] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(`post/${router.query.update}`, {
        headers: {
          isadmin: true
        }
      })

      const data = await res.data
      setNamePost(data.namePost)
      setContent(data.content)
      setTag(data.tag.join())
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (router.query.update) getData()
  }, [router.query.update])


  const updateContent = useCallback((i, updatedItem) => {
    setContent(prevContent => prevContent.map((element,index) => index === i ? updatedItem : element));
  }, []);

  const addContent = useCallback(() => {
    setContent(prevContent => [...prevContent, { p: "", image: "" }]);
  }, []);

  const removeContent = (i) => {
    setContent(prevContent => prevContent.filter((element,index) => index !== i));
  }

  const handleSubmit = useCallback(async () => {
    try {
      await axios.put(`post/update/${router.query.update}`, { namePost, content, athor: user.name, tag: tag.split(" ") }, {
        headers: {
          isadmin: true
        }
      });

      toast.success("update done!")
      router.push("/admin");
    } catch (error) {
      toast.error(error.message)
    }
  }, [namePost, content, tag]);

  const handleRemovePost = async () => {
    try {
      const res = await axios.delete(`post/remove/${router.query.update}`,{
        headers : {
          isadmin : user.admin
        }
      })
      const data = res.data

      if(data.complete){
        router.push("/admin")
        toast.success("remove done!")
      }else{
        throw new Error("")
      }
    } catch (error : any) {
      toast.error(error.message)
    }
  }


  return (
    <div className={style.create}>
      <label className={style.label}>Name new Post : </label>
      <input className={style.input} onChange={(e) => setNamePost(e.target.value)} type="text" value={namePost} />
      {content.map((item, index) => (
        <ContentItem removeContent={removeContent} key={index} i={index} item={item} updateContent={updateContent} />
      ))}
      <button className={style.button} onClick={addContent}>Add Content</button>
      <br />
      <label className={style.label}>Tag : </label>
      <input className={style.input} onChange={(e) => setTag(e.target.value)} name="tag" value={tag} type="text" />
      <button className={style.button} onClick={handleSubmit}>Submit</button>
      <button className={style.button} style={{background : "red"}} onClick={handleRemovePost}>Remove</button>
    </div>
  );
};

export default Update;
