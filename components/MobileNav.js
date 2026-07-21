import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import LocaleDropdown from "./LocaleSelector";

const navLinks = [
  { href: "/", label: "Coffee Review" },
  { href: "/reviews", label: "Reviews" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

const MobileNav = () => {
  return (
    <nav className="visible flex sm:invisible sm:hidden sticky top-0 z-40 w-full bg-bg border-b-2 border-divider px-[clamp(24px,4vw,56px)] py-4 justify-end">
      <Sheet>
        <SheetTrigger
          className="text-ink hover:text-accent"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent className="bg-bg border-l-2 border-divider font-archivo">
          <SheetHeader>
            <SheetTitle className="font-archivo font-extrabold text-ink">
              Want more coffee?
            </SheetTitle>
          </SheetHeader>
          <ul className="mt-6 flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <SheetTrigger asChild>
                  <Link
                    href={href}
                    className="text-[16px] font-semibold hover:text-accent"
                  >
                    {label}
                  </Link>
                </SheetTrigger>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t-2 border-divider pt-4">
            <LocaleDropdown />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
