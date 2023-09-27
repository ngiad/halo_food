import React, { useState, useMemo, useCallback, useEffect } from 'react';
import style from "../../../styles/adminCreate.module.css"; // Import your CSS module
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../../utils/axios';

const ContentItem = React.memo(({ item, updateContent, removeContent }) => {

  const handLeChange = (e) => {
    updateContent(item.id, { ...item, [e.target.name]: e.target.value })
  }

  const handleRemove = () => {
    removeContent(item.id);
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
  const user = useSelector(state =>  state.user)

  const [namePost, setNamePost] = useState("");
  const [content, setContent] = useState([{ p: "", image: "", id: 1 }]);
  const [tag, setTag] = useState("");

  const getData = async() => {
    try {
      const res =await axios.get(`post/${router.query.update}`,{
        headers : {
          isadmin : true
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
    getData()
  },[])


  const updateContent = useCallback((id, updatedItem) => {
    setContent(prevContent => prevContent.map(element => element.id === id ? updatedItem : element));
  }, []);

  const addContent = useCallback(() => {
    setContent(prevContent => [...prevContent, { p: "", image: "", id: prevContent.length + 1 }]);
  }, []);

  const removeContent = (id) => {
    setContent(prevContent => prevContent.filter(element => element.id !== id));
  }

  const handleSubmit = useCallback(async () => {
    try {
      const res = await axios.post("post/create", { namePost, content, athor : user.name, tag: tag.split(" ") }, {
        headers: {
          isadmin: true
        }
      });
      const data = await res.data;
      if (data.complete){
        toast.success("create done!")
        router.push("/admin");
      }else{
        throw new Error(data.message)
      }
    } catch (error) {
      console.log(error);
      
      toast.error(error.message)
    }
  }, [namePost, content, tag]);

  return (
    <div className={style.create}>
      <label className={style.label}>Name new Post : </label>
      <input className={style.input} onChange={(e) => setNamePost(e.target.value)} type="text" value={namePost} />
      {content.map((item) => (
        <ContentItem removeContent={removeContent} key={item.id} item={item} updateContent={updateContent} />
      ))}
      <button className={style.button} onClick={addContent}>Add Content</button>
      <br/>
      <label className={style.label}>Tag : </label>
      <input className={style.input} onChange={(e) => setTag(e.target.value)} name="tag" value={tag} type="text" />
      <button className={style.button} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Update;
