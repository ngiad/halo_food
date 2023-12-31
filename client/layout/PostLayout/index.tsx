import Link from 'next/link';
import React, { ReactNode, useState } from 'react'
import style from "../../styles/MainLayout.module.css"
import { AiOutlineUpCircle } from 'react-icons/ai';
import { BiMenu, BiX } from 'react-icons/bi';
import { BsArrowLeftShort } from 'react-icons/bs';
import postStyle from "../../styles/PostLayout.module.css"
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { userTP } from '../../redux/store';


type PostLayoutProps = {
    children: ReactNode;
};


const PostLayout = ({ children }: PostLayoutProps) => {
    const router = useRouter()
    const user = useSelector((state: userTP) => state.user)

    const [MenuCheck, setMenuCheck] = useState<Boolean>(false)

    const HanclickMenu = (): void => {
        setMenuCheck(MenuCheck ? false : true)
    }

    const windonHandleClick = (): void => {
        if (MenuCheck) setMenuCheck(false)
    }
    return (
        <div onClick={windonHandleClick} className={style.MainLayout}>
        <header>
            <nav>
                <button onClick={HanclickMenu}>{MenuCheck ? <BiX /> : <BiMenu />} </button>
                <ul style={{ display: `${MenuCheck ? "block" : "none"}` }}>
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/hot"}>Hot</Link></li>
                    <li><Link href={"/new"}>New</Link></li>
                </ul>
            </nav>
            <h1>1001 Công thức</h1>
            <div>
                    {
                        user.token ? <Link href={'/profile?page=0'}>
                            <img src={user.photo} alt="avatar" />
                        </Link> : <div>
                            <Link style={{
                                borderBottom: "2px solid #a59d9d",
                                fontSize: "16px",
                                margin: "0 12px",
                                padding: "12px 8px",
                                transition: "all .1s ease-in-out",
                                lineHeight: "47px"
                            }} href={"/login"}>
                                Đăng nhập
                            </Link>
                            <Link style={{
                                borderBottom: "2px solid #a59d9d",
                                fontSize: "16px",
                                margin: "0 12px",
                                padding: "12px 8px",
                                transition: "all .1s ease-in-out",
                                lineHeight: "47px"
                            }} href={"/register"}>Đăng kí</Link>
                        </div>
                    }
                </div>
        </header>

        <main style={{minHeight : "800px"}}>
            <nav className={postStyle.navPost}>
                <button onClick={() => router.back()}><BsArrowLeftShort /></button>
            </nav>
            {children}
        </main>

        <button onClick={() => {
            window.scrollTo({ top : 0 })
        }} className={style.btnUptoTop}><AiOutlineUpCircle /></button>
        <footer style={{padding : "20px",textAlign : "center"}}>
            @By : Trần Đại Nghĩa
        </footer>
    </div>
    )
}

export default PostLayout