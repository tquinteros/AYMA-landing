"use client";

import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "@/lib/actions/blog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { blogsQueryKey } from "@/lib/queries/blogs";

interface DeleteBlogButtonProps {
  id: string;
  title: string;
}

export function DeleteBlogButton({ id, title }: DeleteBlogButtonProps) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteBlog(id);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Blog eliminado.");
        await queryClient.invalidateQueries({ queryKey: blogsQueryKey });
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          disabled={isPending}
        >
          <Trash2Icon className="size-3.5" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar blog?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás por eliminar{" "}
            <span className="font-semibold text-foreground">&ldquo;{title}&rdquo;</span>
            . Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
