import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { MarkdownBody } from "@/components/MarkdownBody";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllPostParams, getPost } from "@/lib/content";

type PageProps = {
  params: Promise<{ topic: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic: raw, slug } = await params;
  const topic = decodeURIComponent(raw);
  const post = getPost(topic, slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description || `${post.topic} · ${post.date}`,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { topic: raw, slug } = await params;
  const topic = decodeURIComponent(raw);
  const post = getPost(topic, slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-[#78716c]">
        <Link className="transition-colors hover:text-[#0c0a09]" href="/">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#a8a29e]" />
        <Link
          className="transition-colors hover:text-[#0c0a09]"
          href={`/${encodeURIComponent(post.topic)}`}
        >
          {post.topic}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#a8a29e]" />
        <span className="text-[#0c0a09]">{post.title}</span>
      </nav>

      {/* Article header */}
      <header className="mt-8 max-w-[72ch]">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#78716c]">
          {post.date}
        </p>
        <h1 className="mt-3 text-[2rem] font-semibold leading-[1.15] tracking-[-0.021em] text-[#0c0a09] sm:text-[2.5rem]">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 text-[1rem] leading-[1.69] text-[#78716c]">
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li key={t}>
                <Badge
                  variant="outline"
                  className="rounded-full border-[#e5e7eb] px-3 py-0.5 text-xs text-[#78716c]"
                >
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </header>

      <Separator className="my-8 max-w-[72ch] bg-[#e5e7eb]" />

      {/* Article body */}
      <div
        className="rounded-[10px] border border-[#e5e7eb] bg-white p-6 sm:p-10"
        style={{ boxShadow: "rgba(0,0,0,0.05) 0px 4px 16px 0px" }}
      >
        <MarkdownBody content={post.content} />
      </div>
    </article>
  );
}
