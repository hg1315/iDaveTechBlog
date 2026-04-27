import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllPostParams, getPost } from "@/lib/content";

type PageProps = {
  params: Promise<{ topic: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
      <nav className="text-sm text-muted">
        <Link className="hover:text-on-dark" href="/">
          Home
        </Link>
        <span className="mx-2 text-muted-soft">/</span>
        <Link
          className="hover:text-on-dark"
          href={`/${encodeURIComponent(post.topic)}`}
        >
          {post.topic}
        </Link>
      </nav>

      <header className="mt-6 max-w-[72ch] border-b border-hairline pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {post.date}
        </p>
        <h1 className="mt-3 text-[2rem] font-bold leading-[1.15] tracking-[-0.04em] text-on-dark sm:text-[2.5rem]">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-4 text-lg text-body">{post.description}</p>
        ) : null}
        {post.tags.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-hairline bg-surface-card px-3 py-1 text-xs font-medium text-body"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-10 rounded-lg border border-hairline bg-surface-card p-6 sm:p-10">
        <MarkdownBody content={post.content} />
      </div>
    </article>
  );
}
