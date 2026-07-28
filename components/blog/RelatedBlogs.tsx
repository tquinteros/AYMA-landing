import type { BlogData } from "@/lib/actions/blog";
import { BlogCard } from "./BlogCard";

interface RelatedBlogsProps {
  blogs: BlogData[];
}

export function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  if (blogs.length === 0) return null;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 pt-16">
      <h2 className="text-2xl font-medium text-roca-500">También te puede interesar</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
