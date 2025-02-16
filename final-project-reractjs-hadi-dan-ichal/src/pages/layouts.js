import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = (props) => {
    return (
        <div>
            <Header />
                <div className="sidebar-content">
                    <Sidebar />
                    {props.content}
                </div>
            <Footer />
        </div>
    );
};

export default Layout;