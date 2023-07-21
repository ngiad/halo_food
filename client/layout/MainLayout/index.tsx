import React, { ReactNode, useState } from 'react';
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

    const windonHandleClick = () => {
        if (MenuCheck) setMenuCheck(false)
    }

    console.log(user.token);



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
                        user.token ? <Link href={'/profile'}>
                            <img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/358061547_1432729000846049_1211357899180701296_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=KK5rF8vBm5sAX-YM3nU&_nc_oc=AQlrvv1TduyGg7GI7cNIdGgy8mu8mU3gl14zGfTcvCz1leeezCoqqBnnNMQtQlQb_2c&_nc_ht=scontent.fhan5-2.fna&oh=00_AfAy6PYwM_IWg0ujWlSkV3D42tRzHkkDElSScePqDgGgyQ&oe=64B02499" alt="avatar" />
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