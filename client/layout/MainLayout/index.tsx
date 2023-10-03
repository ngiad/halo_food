import React, { ReactNode, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { BiMenu, BiX } from 'react-icons/bi';
import style from "../../styles/MainLayout.module.css"
import Link from 'next/link';
import Search from '../../src/Search';
import { AiOutlineUpCircle } from 'react-icons/ai';
import Navigate from '../../src/Navigate';
import { useRouter } from 'next/router';
import { userTP } from '../../redux/store';


type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
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
                            <Link className={style['auth']} href={"/login"}>
                                Đăng nhập
                            </Link>
                            <Link className={style['auth']}href={"/register"}>Đăng kí</Link>
                        </div>
                    }
                </div>
            </header>

            <main style={{ minHeight: "2000px" }}>
                <Search />
                <Navigate />
                {children}
            </main>

            <button onClick={() => {
                window.scrollTo({ top: 0 })
            }} className={style.btnUptoTop}><AiOutlineUpCircle /></button>
            <footer style={{ padding: "20px", textAlign: "center" }}>
                @By : Trần Đại Nghĩa
            </footer>
        </div>
    );
};

export default MainLayout;