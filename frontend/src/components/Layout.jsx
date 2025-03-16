import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ setIsAuthenticated }) => {
  return (
    <>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
