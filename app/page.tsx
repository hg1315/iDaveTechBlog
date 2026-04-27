import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6">
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          Blog
        </p>
        <h1 className="mt-2 text-[2.5rem] font-bold leading-[1.1] tracking-[-0.06em] text-on-dark sm:text-[3rem] md:text-[3.5rem]">
          Recent writing
        </h1>
        <p className="mt-4 text-lg text-body">
          <code className="rounded border border-hairline bg-surface-card px-1.5 py-0.5 font-mono text-sm text-body-strong">
            content/&lt;주제&gt;/YYYY-MM-DD_제목.md
          </code>
          로 글을 추가하세요.
        </p>
      </section>

      <section className="mt-16 space-y-6">
        {posts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-hairline bg-surface-soft px-6 py-12 text-center text-muted">
            아직 글이 없습니다. <span className="text-on-dark">content/</span>{" "}
            아래에 마크다운을 추가한 뒤 빌드하세요.
          </p>
        ) : (
          posts.map((post) => <PostCard key={`${post.topic}-${post.postKey}`} post={post} />)
        )}
      </section>
    </div>
  );
}
