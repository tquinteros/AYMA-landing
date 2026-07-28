import { getBlogs } from "@/lib/actions/blog";
// import { getMailchimpAudiences } from "@/lib/mailchimp";
import { BlogsTable } from "@/components/admin/blogs/BlogsTable";
import { CreateBlogDialog } from "@/components/admin/blogs/CreateBlogDialog";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  // Diagnóstico inicial de audiencias de Mailchimp (ya verificado).
  // const mailchimpAudiences = await getMailchimpAudiences();
  // console.log("[Mailchimp] Audiencias:", mailchimpAudiences);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Gestioná los artículos del blog: creá, editá y publicá contenido.
          </p>
        </div>
        <CreateBlogDialog />
      </div>

      <BlogsTable blogs={blogs} />
    </div>
  );
}
