import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const components: Components = {
  a({ href, children, ...rest }) {
    if (href?.startsWith("/")) {
      return (
        <Link
          className="text-[#3ba6f1] underline underline-offset-2 transition-colors hover:text-[#2a95e0]"
          href={href}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        className="text-[#3ba6f1] underline underline-offset-2 transition-colors hover:text-[#2a95e0]"
        href={href}
        rel="noreferrer"
        target="_blank"
        {...rest}
      >
        {children}
      </a>
    );
  },
  h1: ({ children }) => (
    <h1 className="mb-6 mt-10 text-[2rem] font-semibold leading-[1.15] tracking-[-0.021em] text-[#0c0a09] first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-8 text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.017em] text-[#0c0a09] first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-6 text-[1.125rem] font-semibold leading-[1.25] text-[#0c0a09] first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-[0.9375rem] leading-[1.69] text-[#78716c] last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc pl-6 text-[#78716c] last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal pl-6 text-[#78716c] last:mb-0">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="mb-1 text-[0.9375rem] leading-[1.69]">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-2 border-[#3ba6f1] pl-4 text-[#78716c] not-italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-[#e5e7eb]" />,
  code: ({ className, children, ...rest }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded border border-[#e5e7eb] bg-[#fafaf9] px-1.5 py-0.5 font-mono text-sm text-[#0c0a09]"
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <pre className="not-prose my-4">{children}</pre>,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-[10px] border border-[#e5e7eb]">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm text-[#78716c]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#fafaf9] text-[#0c0a09]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-[#e5e7eb] px-4 py-3 text-xs font-semibold uppercase tracking-[0.04em] text-[#78716c]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[#e5e7eb] px-4 py-3">{children}</td>
  ),
};

type MarkdownBodyProps = {
  content: string;
};

export function MarkdownBody({ content }: MarkdownBodyProps) {
  return (
    <div className="article-md max-w-[72ch]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
