import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css"

export function Nav() {
    return (
        <div className={style.nav_block}>
            <NavLink to={"/service"} className={style.nav}>Service form</NavLink>
            <NavLink to={"/vacancy"} className={style.nav}>Vacancy form</NavLink>
        </div>
    )
}