import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import LocaleDropdown from "./LocaleSelector";
import MobileNav from "./MobileNav";
import Steam from "./Steam";

const navLinks = [
  { href: "/reviews", label: "Reviews" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <MobileNav />
      <nav className="invisible sm:visible hidden sticky top-0 z-40 w-full bg-bg border-b-2 border-divider py-4 px-[clamp(24px,4vw,56px)] sm:flex items-center justify-between">
        <Link href={"/"} className="mr-auto flex items-center gap-2 font-archivo font-extrabold text-[19px]">
          <Steam className="text-accent" />
          The Coffee Review
        </Link>
        <ul className="flex items-center">
          {navLinks.map(({ href, label }) => {
            const isActive = router.pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`mr-8 text-[14px] font-semibold hover:text-accent ${
                  isActive ? "text-accent" : ""
                }`}
              >
                {label}
              </Link>
            );
          })}
        </ul>
        <LocaleDropdown />
      </nav>
    </>
  );
};

export default Navbar;
