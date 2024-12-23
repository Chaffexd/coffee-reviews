import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-56 border-t-slate-150 border-t-2">
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
