import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import './Layout.scss';

const Layout = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;