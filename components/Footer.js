import Link from "next/link";
import React from "react";

const footerLinks = [
  { href: "/reviews", label: "Reviews" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-divider py-8 px-[clamp(24px,4vw,56px)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href={"/"} className="font-archivo font-extrabold text-[19px]">
          The Coffee Review
        </Link>
        <ul className="flex items-center">
          {footerLinks.map(({ href, label }) => (
            <li key={href} className="ml-8">
              <Link href={href} className="mr-8 last:mr-0 text-[14px] font-semibold hover:text-accent">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-[12px] text-ink/60">
        (c) 2026 The Coffee Review - Unbiased since day one
      </p>
    </footer>
  );
};

export default Footer;
