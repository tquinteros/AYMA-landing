"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBlog } from "@/lib/actions/blog";
import { BlogFormDialog } from "./BlogFormDialog";
import { buildBlogFormData } from "./build-blog-form-data";
import { emptyBlogFormValues } from "./blog-form-types";

export function CreateBlogDialog() {
  return (
    <BlogFormDialog
      trigger={
        <Button className="bg-primary-500 hover:bg-primary-500/90 text-background-500">
          <PlusIcon />
          Nuevo blog
        </Button>
      }
      title="Crear blog"
      description="Completá el contenido, la configuración y el SEO del artículo."
      idPrefix="create"
      formId="create-blog-form"
      defaultValues={emptyBlogFormValues}
      submitLabel="Crear blog"
      pendingLabel="Creando..."
      successMessage="Blog creado exitosamente."
      buildFormData={buildBlogFormData}
      action={createBlog}
      resetValuesAfterSuccess={emptyBlogFormValues}
    />
  );
}
