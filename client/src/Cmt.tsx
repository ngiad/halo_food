import React,{memo} from 'react'
import Link from 'next/link'
import style from "../styles/cmt.module.css"

const Cmt = () => {
  return (
    <div className={style.contentcmt}>
        <img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/358061547_1432729000846049_1211357899180701296_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=KK5rF8vBm5sAX-YM3nU&_nc_oc=AQlrvv1TduyGg7GI7cNIdGgy8mu8mU3gl14zGfTcvCz1leeezCoqqBnnNMQtQlQb_2c&_nc_ht=scontent.fhan5-2.fna&oh=00_AfAy6PYwM_IWg0ujWlSkV3D42tRzHkkDElSScePqDgGgyQ&oe=64B02499" alt="avt" />
        <div>
            <Link href={"/profile"}>Ten nguyen dung</Link>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid sunt fuga illo eligendi esse illum, repellendus non dignissimos similique, quam iste praesentium recusandae dolorum ducimus, error odio nesciunt fugit debitis?</p>
        </div>
    </div>
        
  )
}

export default memo(Cmt)