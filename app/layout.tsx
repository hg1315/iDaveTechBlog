import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllTopics } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteTitle = "md_blog_maker";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s · ${siteTitle}`,
  },
  description: "프로젝트 폴더의 마크다운을 정적 블로그로 렌더링합니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topics = getAllTopics();

  return (
    <html
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      lang="ko"
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader siteTitle={siteTitle} topics={topics} />
        <main className="flex-1 bg-canvas">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
