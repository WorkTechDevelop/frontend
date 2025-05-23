import React from "react";
import Header from "../components/header/Header";
import Menu from "../components/header/Menu";
import { Outlet } from "react-router-dom";
import './Layout.scss';

const Layout = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="left-menu__container">
                    <Menu />
                </div>
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;