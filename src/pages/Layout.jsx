import React from "react";
import Navbar from "../components/Navbar";
import CourseList from "./CourseList";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <CourseList /> */}
      <Footer />
    </>
  );
};

export default Layout;
