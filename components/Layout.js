import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GreetingBanner from "./GreetingBanner";

const Layout = ({ children, banner }) => {
  return (
    <>
      {/* Above the nav so the sticky nav still pins to the viewport top. */}
      <GreetingBanner banner={banner} />
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-[clamp(24px,4vw,56px)]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
