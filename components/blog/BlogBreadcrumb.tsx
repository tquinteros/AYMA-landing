import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BlogBreadcrumbProps {
  title: string;
}

export function BlogBreadcrumb({ title }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-primary-900/60">
        <li>
          <Link href="/blog" className="transition-colors hover:text-primary-500">
            Blog
          </Link>
        </li>
        <li aria-hidden className="text-primary-900/30">
          <ChevronRight className="size-3.5" />
        </li>
        <li className="line-clamp-1 font-medium text-roca-500" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}
