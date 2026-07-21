import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-[clamp(24px,4vw,56px)]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
