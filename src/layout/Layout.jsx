import React from "react";
import Header from "./Header/Header";
// import Menu from "./HeaderLeftMenu/Menu";
import { Outlet } from "react-router-dom";
import './Layout.scss';

const Layout = () => {
    return (
        <>
            <Header />
            <div className="container">
                {/* <div className="left-menu__container">
                    <Menu />
                </div> */}
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;