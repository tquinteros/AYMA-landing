"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMembershipFaq } from "@/lib/actions/membership-faq";
import { membershipFaqsQueryKey } from "@/lib/queries/membership-faqs";

interface FormValues {
  question: string;
  answer: string;
}

export function CreateMembershipFaqDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  function handleOpenChange(next: boolean) {
    if (isPending) return;
    setOpen(next);
    if (!next) reset();
  }

  function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("question", values.question);
    formData.append("answer", values.answer);

    startTransition(async () => {
      const result = await createMembershipFaq(undefined, formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Pregunta frecuente creada.");
        reset();
        setOpen(false);
        await queryClient.invalidateQueries({ queryKey: membershipFaqsQueryKey });
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary-500 hover:bg-primary-500/90 text-background-500">
          <PlusIcon />
          Nueva pregunta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear pregunta frecuente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="create-question">Pregunta *</Label>
            <Input
              id="create-question"
              aria-invalid={!!errors.question}
              {...register("question", {
                required: "La pregunta es obligatoria.",
              })}
            />
            {errors.question && (
              <p className="text-xs text-destructive">
                {errors.question.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="create-answer">Respuesta *</Label>
            <Textarea
              id="create-answer"
              rows={4}
              aria-invalid={!!errors.answer}
              {...register("answer", {
                required: "La respuesta es obligatoria.",
              })}
            />
            {errors.answer && (
              <p className="text-xs text-destructive">
                {errors.answer.message}
              </p>
            )}
          </div>

          <DialogFooter showCloseButton>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary-500 hover:bg-primary-500/90 text-background-500"
            >
              {isPending ? "Creando..." : "Crear pregunta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
