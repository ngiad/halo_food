import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React from 'react'
import style from "../styles/post.module.css"
import PostLayout from '../layout/PostLayout';
import Cmt from '../src/Cmt';



const postPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={style.postPage}>
      <div className={style.content}>
        <div className={style.top}>
          <h1>Name Post</h1>
          <span>Trần Đại Nghĩa</span>
        </div>
        <div className={style.bottom}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem qui quasi corporis, ipsam tempora nihil perspiciatis nisi quidem dignissimos at provident ipsa dolorem, aspernatur voluptates natus, molestiae magni eligendi voluptatum?
            Quam recusandae perspiciatis, minima doloremque rem, maxime possimus aliquam accusamus eum temporibus, hic veritatis. Cum libero tenetur quibusdam, molestiae numquam totam repudiandae ex debitis? Tenetur qui obcaecati alias exercitationem sed!
            Tenetur corrupti incidunt ipsam non at quis necessitatibus inventore, dolore aliquid, doloribus repudiandae architecto eum, unde natus explicabo. Optio consectetur tenetur vero ullam natus unde quibusdam recusandae sint, laborum nam!
          </p>

          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjC156bHCqVlLZIyMIhPmGAS9lT7Da5qGC-NdsY7ju&s" alt="mon an" />
         
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem qui quasi corporis, ipsam tempora nihil perspiciatis nisi quidem dignissimos at provident ipsa dolorem, aspernatur voluptates natus, molestiae magni eligendi voluptatum?
            Quam recusandae perspiciatis, minima doloremque rem, maxime possimus aliquam accusamus eum temporibus, hic veritatis. Cum libero tenetur quibusdam, molestiae numquam totam repudiandae ex debitis? Tenetur qui obcaecati alias exercitationem sed!
            Tenetur corrupti incidunt ipsam non at quis necessitatibus inventore, dolore aliquid, doloribus repudiandae architecto eum, unde natus explicabo. Optio consectetur tenetur vero ullam natus unde quibusdam recusandae sint, laborum nam!
          </p>
        </div>

        <div className={style.youthink}>
          <form>
            <input type="text" placeholder='Viết suy nghĩ của bạn ...' />
            <button>Gửi</button>
          </form>
        </div>
      </div>
      <div className={style.cmt}>
          <h2>Bình luận</h2>
          <Cmt />
          <Cmt />
          <Cmt />
          <Cmt />
          <Cmt />
      </div>
    </div>
  )
}
postPage.layout = PostLayout

export default postPage