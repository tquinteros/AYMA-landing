interface BlogContentProps {
  html: string;
}

export function BlogContent({ html }: BlogContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none font-sans prose-headings:font-sans prose-headings:font-medium prose-headings:text-background-100 prose-p:text-background-100 prose-a:text-primary-500 prose-strong:text-background-100 prose-blockquote:border-primary-500 prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
