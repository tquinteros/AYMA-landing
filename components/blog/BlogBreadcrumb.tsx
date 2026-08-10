import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BlogBreadcrumbProps {
  title: string;
}

export function BlogBreadcrumb({ title }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link href="/journal" className="transition-colors text-background-900">
            Journal
          </Link>
        </li>
        <li aria-hidden className="text-surface-500">
          <ChevronRight className="size-3.5" />
        </li>
        <li className="line-clamp-1 text-background-100" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}
