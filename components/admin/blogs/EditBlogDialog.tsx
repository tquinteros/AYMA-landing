"use client";

import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PencilIcon, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateBlog, type BlogData } from "@/lib/actions/blog";
import { blogsQueryKey } from "@/lib/queries/blogs";
import { BlogFormFields } from "./BlogFormFields";
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
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const formId = `edit-blog-form-${blog._id}`;

  const form = useForm<BlogFormValues>({
    defaultValues: blogToFormValues(blog),
  });

  function handleOpenChange(next: boolean) {
    if (isPending) return;
    setOpen(next);
    if (next) form.reset(blogToFormValues(blog));
  }

  function onSubmit(values: BlogFormValues) {
    const formData = new FormData();
    formData.append("id", blog._id);
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("excerpt", values.excerpt);
    formData.append("content", values.content);
    formData.append("coverImageUrl", values.coverImageUrl);
    formData.append("coverImageKey", values.coverImageKey);
    formData.append("coverImageAlt", values.coverImageAlt);
    formData.append("previousCoverImageKey", blog.coverImage.key ?? "");
    formData.append("category", values.category);
    formData.append("tags", values.tags.join("\n"));
    formData.append("status", values.status);
    formData.append("publishedAt", values.publishedAt);
    formData.append("featured", values.featured ? "true" : "false");
    formData.append("seoMetaTitle", values.seoMetaTitle);
    formData.append("seoMetaDescription", values.seoMetaDescription);
    formData.append("seoOgImage", values.seoOgImage);

    startTransition(async () => {
      const result = await updateBlog(undefined, formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Blog actualizado exitosamente.");
        await queryClient.invalidateQueries({ queryKey: blogsQueryKey });
        router.refresh();
        setOpen(false);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <PencilIcon className="size-3.5" />
          <span className="sr-only">Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="flex-row items-center gap-3 space-y-0 border-b px-6 py-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
            <Newspaper className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5 text-left">
            <DialogTitle className="text-lg">Editar blog</DialogTitle>
            <DialogDescription>
              Actualizá el contenido, la configuración y el SEO del artículo.
            </DialogDescription>
          </div>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            id={formId}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto px-6 py-5"
          >
            <BlogFormFields idPrefix={`edit-${blog._id}`} />
          </form>
        </FormProvider>

        <div className="flex flex-col-reverse gap-2 border-t bg-muted/40 px-6 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form={formId}
            disabled={isPending}
            className="bg-primary-500 hover:bg-primary-500/90 text-background-500"
          >
            {isPending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
