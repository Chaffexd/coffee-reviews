import Link from "next/link";
import React from "react";
import LocaleDropdown from "./LocaleSelector";


const Navbar = () => {
  return (
    <nav className="w-full py-8 px-56 max-w-screen-2xl m-auto flex items-center justify-between">
      <ul className="flex">
        <Link href={"/"} className="mr-8 hover:underline">
          Coffee Review
        </Link>
        <Link href={"/reviews"} className="mr-8 hover:underline">
          Reviews
        </Link>
        <Link href={"/articles"} className="mr-8 hover:underline">
          Articles
        </Link>
        <Link href={"/about"} className="mr-8 hover:underline">
          About
        </Link>
      </ul>
      <LocaleDropdown />
    </nav>
  );
};

export default Navbar;
