import Link from "next/link";
import type { Post } from "@/lib/content";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const href = `/${encodeURIComponent(post.topic)}/${encodeURIComponent(post.postKey)}`;

  return (
    <article className="rounded-lg border border-hairline bg-surface-card p-6 transition-colors hover:border-hairline-strong sm:p-8">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-muted-soft">
        <span className="rounded-full bg-surface-soft px-2 py-0.5 text-[0.7rem] font-semibold normal-case tracking-wide text-on-dark">
          {post.topic}
        </span>
        <span className="text-muted">{post.date}</span>
      </div>
      <h2 className="mt-3 text-xl font-bold tracking-[-0.02em] text-on-dark">
        <Link className="hover:text-primary" href={href}>
          {post.title}
        </Link>
      </h2>
      {post.description ? (
        <p className="mt-2 line-clamp-2 text-sm text-body">{post.description}</p>
      ) : null}
      <div className="mt-4">
        <Link
          className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-on-primary"
          href={href}
        >
          읽기
        </Link>
      </div>
    </article>
  );
}
