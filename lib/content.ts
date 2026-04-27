import fs from "fs";
import path from "path";
import matter from "gray-matter";
import fg from "fast-glob";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Basename without .md, e.g. 2025-04-27_my-post */
const FILE_KEY_RE = /^(\d{4}-\d{2}-\d{2})_(.+)\.md$/;

export type Post = {
  topic: string;
  /** YYYY-MM-DD from filename */
  date: string;
  /** Suffix after date_, used for display */
  titleSlug: string;
  /** Unique key: `${date}_${titleSlug}` (matches basename without .md) */
  postKey: string;
  filePath: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
};

function parseEntry(relative: string, fullPath: string): Post | null {
  const norm = relative.split(path.sep).join("/");
  const parts = norm.split("/");
  if (parts.length !== 2) {
    console.warn(
      `[content] Skipping (expected content/<topic>/file.md): ${norm}`,
    );
    return null;
  }
  const [topic, filename] = parts;
  const m = filename.match(FILE_KEY_RE);
  if (!m) {
    console.warn(
      `[content] Skipping ${norm}: use YYYY-MM-DD_title.md in content/<topic>/`,
    );
    return null;
  }
  const date = m[1];
  const titleSlug = m[2];
  const postKey = `${date}_${titleSlug}`;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const title =
    typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : titleSlug.replace(/-/g, " ");
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  const tags = Array.isArray(data.tags)
    ? data.tags.map(String).filter(Boolean)
    : [];

  return {
    topic,
    date,
    titleSlug,
    postKey,
    filePath: fullPath,
    title,
    description,
    content,
    tags,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fg.sync("**/*.md", {
    cwd: CONTENT_DIR,
    absolute: true,
    onlyFiles: true,
  });

  const posts: Post[] = [];
  for (const abs of files) {
    const rel = path.relative(CONTENT_DIR, abs);
    const p = parseEntry(rel, abs);
    if (p) posts.push(p);
  }

  const byKey = (a: Post, b: Post) => b.date.localeCompare(a.date);
  return posts.sort(byKey);
}

export function getAllTopics(): string[] {
  const set = new Set(getAllPosts().map((p) => p.topic));
  return Array.from(set).sort();
}

export function getPostsByTopic(topic: string): Post[] {
  return getAllPosts().filter((p) => p.topic === topic);
}

export function getPost(
  topic: string,
  postKey: string,
): Post | null {
  const filePath = path.join(CONTENT_DIR, topic, `${postKey}.md`);
  if (!fs.existsSync(filePath)) return null;
  const rel = path.join(topic, `${postKey}.md`);
  return parseEntry(rel, filePath);
}

export function getAllPostParams(): { topic: string; slug: string }[] {
  return getAllPosts().map((p) => ({
    topic: p.topic,
    slug: p.postKey,
  }));
}

export function getTopicParams(): { topic: string }[] {
  return getAllTopics().map((topic) => ({ topic }));
}
