import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllTopics } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteTitle = "iDaveBlog";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s · ${siteTitle}`,
  },
  description: "Dave의 기술 블로그. 마크다운으로 관리하는 정적 블로그.",
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
      <body className="flex min-h-full flex-col bg-[#fafaf9] font-sans text-[#0c0a09]">
        <SiteHeader siteTitle={siteTitle} topics={topics} />
        <main className="flex-1 bg-[#fafaf9]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
