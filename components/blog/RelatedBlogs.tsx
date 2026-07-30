import type { BlogData } from "@/lib/actions/blog";
import { BlogCard } from "./BlogCard";

interface RelatedBlogsProps {
  blogs: BlogData[];
}

export function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  if (blogs.length === 0) return null;

  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-32">
      <h2 className="text-xl font-medium text-background-100">Artículos relacionados</h2>
      <div className="flex flex-col gap-5">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} variant="list" />
        ))}
      </div>
    </div>
  );
}
