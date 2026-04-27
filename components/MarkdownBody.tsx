import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const components: Components = {
  a({ href, children, ...rest }) {
    if (href?.startsWith("/")) {
      return (
        <Link
          className="text-primary underline decoration-primary/60 underline-offset-2 hover:decoration-primary"
          href={href}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        className="text-primary underline decoration-primary/60 underline-offset-2 hover:decoration-primary"
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
    <h1 className="mt-0 text-[1.75rem] font-bold leading-tight tracking-[-0.04em] text-on-dark sm:text-[2rem]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-on-dark first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-lg font-semibold text-body-strong first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-4 text-body last:mb-0">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 list-disc pl-6 text-body last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal pl-6 text-body last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-2 border-primary/80 pl-4 text-body-strong not-italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-hairline" />,
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
        className="rounded border border-hairline bg-surface-card px-1.5 py-0.5 font-mono text-sm text-body-strong"
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <pre className="not-prose my-4">{children}</pre>,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm text-body">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="text-on-dark">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-hairline bg-surface-soft px-3 py-2 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-hairline px-3 py-2">{children}</td>
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
