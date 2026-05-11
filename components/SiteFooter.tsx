import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[#e5e7eb] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold text-[#0c0a09]">iDaveBlog</p>
        <p className="mt-2 max-w-md text-sm text-[#78716c]">
          마크다운으로 관리하는 정적 블로그. Vercel + Next.js
        </p>

        <Separator className="my-8 bg-[#e5e7eb]" />

        <div className="flex flex-wrap gap-6">
          <Link
            className="text-sm text-[#78716c] transition-colors hover:text-[#0c0a09]"
            href="https://nextjs.org"
            rel="noreferrer"
            target="_blank"
          >
            Next.js
          </Link>
          <Link
            className="text-sm text-[#78716c] transition-colors hover:text-[#0c0a09]"
            href="https://vercel.com"
            rel="noreferrer"
            target="_blank"
          >
            Vercel
          </Link>
          <Link
            className="text-sm text-[#78716c] transition-colors hover:text-[#0c0a09]"
            href="https://ui.shadcn.com"
            rel="noreferrer"
            target="_blank"
          >
            shadcn/ui
          </Link>
        </div>

        <p className="mt-10 text-xs text-[#a8a29e]">
          © {new Date().getFullYear()} Dave. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
