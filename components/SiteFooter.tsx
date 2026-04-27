import Link from "next/link";

const footerLink = "text-sm text-muted hover:text-on-dark";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline bg-canvas py-16 text-muted">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <p className="text-sm text-on-dark">md_blog_maker</p>
        <p className="mt-2 max-w-md text-sm text-body">
          마크다운으로 관리하는 정적 블로그. Vercel + Next.js
        </p>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link
            className={footerLink}
            href="https://nextjs.org"
            rel="noreferrer"
            target="_blank"
          >
            Next.js
          </Link>
          <Link
            className={footerLink}
            href="https://vercel.com"
            rel="noreferrer"
            target="_blank"
          >
            Vercel
          </Link>
        </div>
        <p className="mt-10 text-xs text-muted-soft">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
