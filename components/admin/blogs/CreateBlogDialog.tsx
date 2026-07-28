"use client";

import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PlusIcon, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createBlog } from "@/lib/actions/blog";
import { blogsQueryKey } from "@/lib/queries/blogs";
import { BlogFormFields } from "./BlogFormFields";
import { emptyBlogFormValues, type BlogFormValues } from "./blog-form-types";

const FORM_ID = "create-blog-form";

export function CreateBlogDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<BlogFormValues>({
    defaultValues: emptyBlogFormValues,
  });

  function handleOpenChange(next: boolean) {
    if (isPending) return;
    setOpen(next);
    if (!next) form.reset(emptyBlogFormValues);
  }

  function onSubmit(values: BlogFormValues) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("excerpt", values.excerpt);
    formData.append("content", values.content);
    formData.append("coverImageUrl", values.coverImageUrl);
    formData.append("coverImageKey", values.coverImageKey);
    formData.append("coverImageAlt", values.coverImageAlt);
    formData.append("category", values.category);
    formData.append("tags", values.tags.join("\n"));
    formData.append("status", values.status);
    formData.append("publishedAt", values.publishedAt);
    formData.append("featured", values.featured ? "true" : "false");
    formData.append("seoMetaTitle", values.seoMetaTitle);
    formData.append("seoMetaDescription", values.seoMetaDescription);
    formData.append("seoOgImage", values.seoOgImage);

    startTransition(async () => {
      const result = await createBlog(undefined, formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Blog creado exitosamente.");
        form.reset(emptyBlogFormValues);
        setOpen(false);
        await queryClient.invalidateQueries({ queryKey: blogsQueryKey });
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary-500 hover:bg-primary-500/90 text-background-500">
          <PlusIcon />
          Nuevo blog
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="flex-row items-center gap-3 space-y-0 border-b px-6 py-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
            <Newspaper className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5 text-left">
            <DialogTitle className="text-lg">Crear blog</DialogTitle>
            <DialogDescription>
              Completá el contenido, la configuración y el SEO del artículo.
            </DialogDescription>
          </div>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            id={FORM_ID}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto px-6 py-5"
          >
            <BlogFormFields idPrefix="create" />
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
            form={FORM_ID}
            disabled={isPending}
            className="bg-primary-500 hover:bg-primary-500/90 text-background-500"
          >
            {isPending ? "Creando..." : "Crear blog"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
