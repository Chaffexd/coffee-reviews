import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="invisible sm:visible w-full sm:py-8 px-56 border-t-slate-150 border-t-2 max-w-screen-2xl m-auto">
      <ul className="flex justify-end">
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
    </footer>
  );
};

export default Footer;
