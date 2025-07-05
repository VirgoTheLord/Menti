import React from "react";
import Navbar from "../common/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../common/Footer";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
