import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import style from "../styles/navigate.module.css"


const Navigate = () => {
    const router = useRouter()

    const Navigate = useMemo(() => {
        if(router.asPath.split("/")[1].includes("?")) return router.asPath.split("/")[1].split("?")[0]
        return router.asPath.split("/")[1]
    }, [router])

    return (
        <div className={style.navigate}>{!Navigate ? "home" : Navigate}</div>
    )
}

export default memo(Navigate)