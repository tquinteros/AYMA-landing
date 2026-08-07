"use client";

import { useState, useTransition, type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { blogsQueryKey } from "@/lib/queries/blogs";
import { BlogFormFields } from "./BlogFormFields";
import { blogFormSchema, type BlogFormValues } from "./blog-form-types";

interface BlogFormActionResult {
  error?: string;
  success?: boolean;
}

interface BlogFormDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  idPrefix: string;
  formId: string;
  defaultValues: BlogFormValues;
  submitLabel: string;
  pendingLabel: string;
  successMessage: string;
  buildFormData: (values: BlogFormValues) => FormData;
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<BlogFormActionResult | undefined>;
  /** Values to reset the form to after a successful submit (e.g. an empty form for "create"). If omitted, the form keeps the submitted values. */
  resetValuesAfterSuccess?: BlogFormValues;
}

export function BlogFormDialog({
  trigger,
  title,
  description,
  idPrefix,
  formId,
  defaultValues,
  submitLabel,
  pendingLabel,
  successMessage,
  buildFormData,
  action,
  resetValuesAfterSuccess,
}: BlogFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [confirmDiscardOpen, setConfirmDiscardOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  function closeAndReset(nextValues: BlogFormValues) {
    setOpen(false);
    setConfirmDiscardOpen(false);
    form.reset(nextValues);
  }

  function requestClose() {
    if (isPending) return;
    if (form.formState.isDirty) {
      setConfirmDiscardOpen(true);
      return;
    }
    closeAndReset(defaultValues);
  }

  function handleOpenChange(next: boolean) {
    if (isPending) return;
    if (next) {
      setOpen(true);
      form.reset(defaultValues);
      return;
    }
    requestClose();
  }

  function onSubmit(values: BlogFormValues) {
    startTransition(async () => {
      const formData = buildFormData(values);
      const result = await action(undefined, formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(successMessage);
        await queryClient.invalidateQueries({ queryKey: blogsQueryKey });
        router.refresh();
        closeAndReset(resetValuesAfterSuccess ?? values);
      }
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="flex max-h-[85vh] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
          <DialogHeader className="flex-row items-center gap-3 space-y-0 border-b px-6 py-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
              <Newspaper className="size-5" />
            </div>
            <div className="flex flex-col gap-0.5 text-left">
              <DialogTitle className="text-lg">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </DialogHeader>

          <FormProvider {...form}>
            <form
              id={formId}
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 overflow-y-auto px-6 py-5"
            >
              <BlogFormFields idPrefix={idPrefix} />
            </form>
          </FormProvider>

          <div className="flex flex-col-reverse gap-2 border-t bg-muted/40 px-6 py-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={requestClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form={formId}
              disabled={isPending}
              className="bg-primary-500 hover:bg-primary-500/90 text-background-500"
            >
              {isPending ? pendingLabel : submitLabel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDiscardOpen} onOpenChange={setConfirmDiscardOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Descartar cambios?</AlertDialogTitle>
            <AlertDialogDescription>
              Tenés cambios sin guardar en este formulario. Si cerrás ahora, se
              van a perder.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Seguir editando</AlertDialogCancel>
            <AlertDialogAction onClick={() => closeAndReset(defaultValues)}>
              Descartar cambios
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
