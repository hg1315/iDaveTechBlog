import Link from "next/link";
import type { Post } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const href = `/${encodeURIComponent(post.topic)}/${encodeURIComponent(post.postKey)}`;

  return (
    <Card
      className="border border-[#e5e7eb] bg-white transition-shadow hover:shadow-[rgba(0,0,0,0.08)_0px_6px_20px_0px]"
      style={{ borderRadius: "10px", boxShadow: "rgba(0,0,0,0.05) 0px 4px 16px 0px" }}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="rounded-full bg-[#c1e1f7] px-3 py-0.5 text-xs font-semibold text-[#0c0a09] hover:bg-[#c1e1f7]"
          >
            {post.topic}
          </Badge>
          <span className="text-xs text-[#a8a29e]">{post.date}</span>
        </div>
        <h2 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.017em] text-[#0c0a09]">
          <Link href={href} className="transition-colors hover:text-[#3ba6f1]">
            {post.title}
          </Link>
        </h2>
      </CardHeader>

      {post.description && (
        <CardContent className="pb-3">
          <p className="line-clamp-2 text-sm leading-relaxed text-[#78716c]">
            {post.description}
          </p>
        </CardContent>
      )}

      {post.tags.length > 0 && (
        <CardContent className="pb-3 pt-0">
          <ul className="flex flex-wrap gap-2">
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
        </CardContent>
      )}

      <CardFooter className="pt-2">
        <Link
          href={href}
          className="inline-flex items-center rounded-full bg-[#3ba6f1] px-5 text-sm font-medium text-white transition-colors hover:bg-[#2a95e0]"
          style={{ height: "36px" }}
        >
          읽기
        </Link>
      </CardFooter>
    </Card>
  );
}
