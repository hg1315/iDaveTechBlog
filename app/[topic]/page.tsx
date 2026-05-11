import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getPostsByTopic, getTopicParams } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

type PageProps = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  return getTopicParams();
}

export default async function TopicPage({ params }: PageProps) {
  const { topic: raw } = await params;
  const topic = decodeURIComponent(raw);
  const posts = getPostsByTopic(topic);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#78716c]">
          Topic
        </p>
        <h1 className="mt-2 text-[2.25rem] font-semibold leading-[1.12] tracking-[-0.021em] text-[#0c0a09] sm:text-[2.75rem]">
          {topic}
        </h1>
        <p className="mt-3 text-sm text-[#78716c]">
          {posts.length}개의 글
        </p>
      </header>

      <Separator className="my-8 bg-[#e5e7eb]" />

      <section className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.postKey} post={post} />
        ))}
      </section>
    </div>
  );
}
