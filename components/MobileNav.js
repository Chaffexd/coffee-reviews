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
import LocaleDropdown from "./LocaleSelector";

const MobileNav = () => {
  return (
    <nav className="sm:invisible visible sm:hidden px-4 pt-4 flex justify-end">
      <Sheet>
        <SheetTrigger>X</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Want more coffee?</SheetTitle>
            <SheetTrigger asChild>
              <Link href={"/"} className="mr-8 hover:underline">
                Coffee Review
              </Link>
            </SheetTrigger>
            <SheetTrigger asChild>
              <Link href={"/reviews"} className="mr-8 hover:underline">
                Reviews
              </Link>
            </SheetTrigger>

            <SheetTrigger asChild>
              <Link href={"/articles"} className="mr-8 hover:underline">
                Articles
              </Link>
            </SheetTrigger>

            <SheetTrigger asChild>
              <Link href={"/about"} className="mr-8 hover:underline">
                About
              </Link>
            </SheetTrigger>

            <LocaleDropdown />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
