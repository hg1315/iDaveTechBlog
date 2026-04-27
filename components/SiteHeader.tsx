"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SiteHeaderProps = {
  siteTitle: string;
  topics: string[];
};

const navClass =
  "text-sm font-medium text-body tracking-normal hover:text-on-dark transition-colors";
const activeNav = "text-on-dark";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader({ siteTitle, topics }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 h-16 shrink-0 border-b border-hairline bg-canvas"
      data-open={open ? "true" : "false"}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-bold tracking-[-0.02em] text-on-dark"
          onClick={() => setOpen(false)}
        >
          {siteTitle}
        </Link>

        <button
          type="button"
          className="inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-md border border-hairline text-on-dark md:hidden"
          aria-expanded={open}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "≡"}
        </button>

        <nav
          className={[
            "absolute left-0 right-0 top-16 z-50 max-h-[min(70vh,480px)] flex-col gap-0 overflow-y-auto border-b border-hairline bg-canvas py-2 md:static md:top-0 md:max-h-none md:flex md:flex-row md:items-center md:gap-6 md:overflow-visible md:border-0 md:py-0",
            open ? "flex" : "hidden md:flex",
          ].join(" ")}
        >
          <Link
            href="/"
            className={[
              navClass,
              "px-4 py-3 md:px-0 md:py-0",
              isActivePath(pathname, "/") ? activeNav : "",
            ].join(" ")}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          {topics.map((t) => {
            const href = `/${encodeURIComponent(t)}`;
            return (
              <Link
                key={t}
                href={href}
                className={[
                  navClass,
                  "px-4 py-3 md:px-0 md:py-0",
                  isActivePath(pathname, href) ? activeNav : "",
                ].join(" ")}
                onClick={() => setOpen(false)}
              >
                {t}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
