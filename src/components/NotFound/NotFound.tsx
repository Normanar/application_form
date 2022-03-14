import React from "react";
import style from "./NotFound.module.css"
import {NavLink} from "react-router-dom";


export function NotFound() {
    return (
        <div className={style.text}>
            <div>404</div>
            <div>Not found</div>
            <NavLink to={"/"} className={style.nav}>На главную</NavLink>
        </div>
    )
}