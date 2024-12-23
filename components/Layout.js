import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="px-56">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;