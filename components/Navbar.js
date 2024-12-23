import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full py-8 px-56">
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
    </nav>
  );
};

export default Navbar;
