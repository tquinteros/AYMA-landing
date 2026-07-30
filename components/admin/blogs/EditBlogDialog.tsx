"use client";

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateBlog, type BlogData } from "@/lib/actions/blog";
import { BlogFormDialog } from "./BlogFormDialog";
import { buildBlogFormData } from "./build-blog-form-data";
import type { BlogFormValues } from "./blog-form-types";

interface EditBlogDialogProps {
  blog: BlogData;
}

function blogToFormValues(blog: BlogData): BlogFormValues {
  return {
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    coverImageUrl: blog.coverImage.url,
    coverImageKey: blog.coverImage.key ?? "",
    coverImageAlt: blog.coverImage.alt ?? "",
    category: blog.category ?? "",
    tags: blog.tags,
    status: blog.status,
    publishedAt: blog.publishedAt ?? "",
    featured: blog.featured,
    seoMetaTitle: blog.seo?.metaTitle ?? "",
    seoMetaDescription: blog.seo?.metaDescription ?? "",
    seoOgImage: blog.seo?.ogImage ?? "",
  };
}

export function EditBlogDialog({ blog }: EditBlogDialogProps) {
  return (
    <BlogFormDialog
      trigger={
        <Button variant="ghost" size="icon-sm">
          <PencilIcon className="size-3.5" />
          <span className="sr-only">Editar</span>
        </Button>
      }
      title="Editar blog"
      description="Actualizá el contenido, la configuración y el SEO del artículo."
      idPrefix={`edit-${blog._id}`}
      formId={`edit-blog-form-${blog._id}`}
      defaultValues={blogToFormValues(blog)}
      submitLabel="Guardar cambios"
      pendingLabel="Guardando..."
      successMessage="Blog actualizado exitosamente."
      buildFormData={(values) =>
        buildBlogFormData(values, {
          id: blog._id,
          previousCoverImageKey: blog.coverImage.key ?? "",
        })
      }
      action={updateBlog}
    />
  );
}
