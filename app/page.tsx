import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6">
      {/* Hero section */}
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#78716c]">
          Blog
        </p>
        <h1 className="mt-2 text-[2.5rem] font-semibold leading-[1.12] tracking-[-0.021em] text-[#0c0a09] sm:text-[3rem] md:text-[3.25rem]">
          Recent writing
        </h1>
        <p className="mt-4 text-[1rem] leading-[1.69] text-[#78716c]">
          <code className="rounded border border-[#e5e7eb] bg-white px-1.5 py-0.5 font-mono text-sm text-[#0c0a09]">
            content/&lt;주제&gt;/YYYY-MM-DD_제목.md
          </code>
          로 글을 추가하세요.
        </p>
      </section>

      {/* Post list */}
      <section className="mt-16 space-y-6">
        {posts.length === 0 ? (
          <p className="rounded-[10px] border border-dashed border-[#e5e7eb] bg-white px-6 py-12 text-center text-sm text-[#78716c]">
            아직 글이 없습니다.{" "}
            <span className="font-medium text-[#0c0a09]">content/</span> 아래에
            마크다운을 추가한 뒤 빌드하세요.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard key={`${post.topic}-${post.postKey}`} post={post} />
          ))
        )}
      </section>
    </div>
  );
}
