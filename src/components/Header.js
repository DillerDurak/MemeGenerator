import React from "react";
import Router from "../roots/Router";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../css/index.css";
import logoImg from "../images/TrollFace.svg"

const Header = () => {
    let navigate = useNavigate();


    return (
        <header className="header">
            <div className="header__content">
                <div className="logo" onClick={() => navigate(Router.MAIN)}>
                    <img src={logoImg} alt=""></img>
                    <span>Meme Generator</span>
                </div>

                <NavLink to={Router.ABOUT} className="about">О нас</NavLink>

                <div className="name">React Course - Project 3</div>
            </div>
        </header>
    )
}

export default Header;