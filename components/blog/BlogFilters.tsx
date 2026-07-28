import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  categories: string[];
  tags: string[];
  activeCategory?: string;
  activeTag?: string;
}

function buildHref(params: { category?: string; tag?: string }) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.tag) search.set("tag", params.tag);
  const query = search.toString();
  return query ? `/blog?${query}` : "/blog";
}

export function BlogFilters({
  categories,
  tags,
  activeCategory,
  activeTag,
}: BlogFiltersProps) {
  if (categories.length === 0 && tags.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={buildHref({ tag: activeTag })}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wide transition-colors",
              !activeCategory
                ? "border-primary-500 bg-primary-500 text-background-100"
                : "border-primary-900/20 text-primary-900/70 hover:border-primary-500"
            )}
          >
            Todas
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={buildHref({ category, tag: activeTag })}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wide transition-colors",
                activeCategory === category
                  ? "border-primary-500 bg-primary-500 text-background-100"
                  : "border-primary-900/20 text-primary-900/70 hover:border-primary-500"
              )}
            >
              {category}
            </Link>
          ))}
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={buildHref({ category: activeCategory, tag: activeTag === tag ? undefined : tag })}
              className={cn(
                "rounded-full px-3 py-1 text-xs transition-colors",
                activeTag === tag
                  ? "bg-roca-500 text-background-100"
                  : "bg-background-900/60 text-primary-900/70 hover:bg-background-900"
              )}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
