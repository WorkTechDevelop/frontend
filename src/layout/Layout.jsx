import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Menu from "./HeaderLeftMenu/Menu";

const Layout = () => {
    return (
        <>
            <Header />
            <Menu />
            <Outlet />
        </>
    );
};

export default Layout;