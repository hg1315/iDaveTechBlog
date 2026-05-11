"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  siteTitle: string;
  topics: string[];
};

function NavLink({
  href,
  children,
  onClick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium transition-colors px-4 py-3 md:px-0 md:py-0",
        active
          ? "text-[#3ba6f1] md:after:absolute md:after:bottom-[-20px] md:after:left-0 md:after:right-0 md:after:h-[2px] md:after:rounded-full md:after:bg-[#3ba6f1] md:after:content-['']"
          : "text-[#78716c] hover:text-[#0c0a09]"
      )}
    >
      {children}
    </Link>
  );
}

export function SiteHeader({ siteTitle, topics }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header
      className="sticky top-0 z-50 h-16 shrink-0 border-b border-[#e5e7eb] bg-white"
      style={{ boxShadow: "rgba(0,0,0,0.05) 0px 1px 2px 0px" }}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-sm font-semibold tracking-[-0.02em] text-[#0c0a09] transition-colors hover:text-[#3ba6f1]"
        >
          {siteTitle}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/" active={isActive("/")}>Home</NavLink>
          {topics.map((t) => {
            const href = `/${encodeURIComponent(t)}`;
            return (
              <NavLink key={t} href={href} active={isActive(href)}>
                {t}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#e5e7eb] text-[#78716c] transition-colors hover:bg-[#fafaf9] hover:text-[#0c0a09] md:hidden"
          aria-expanded={open}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div
          className="absolute left-0 right-0 top-16 z-50 border-b border-[#e5e7eb] bg-white py-2 md:hidden"
          style={{ boxShadow: "rgba(0,0,0,0.05) 0px 4px 16px 0px" }}
        >
          <nav className="flex flex-col">
            <NavLink href="/" active={isActive("/")} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            {topics.map((t) => {
              const href = `/${encodeURIComponent(t)}`;
              return (
                <NavLink key={t} href={href} active={isActive(href)} onClick={() => setOpen(false)}>
                  {t}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
