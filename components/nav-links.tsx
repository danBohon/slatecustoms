"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav aria-label="Site navigation" className="flex items-center gap-6 sm:gap-8">
      {links.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={`font-sans text-sm font-medium uppercase tracking-wide transition-colors ${
            pathname === href
              ? "text-text-primary"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
