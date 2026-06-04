"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PencilIcon } from "lucide-react";
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
import {
  updateMembershipFaq,
  type MembershipFaqData,
} from "@/lib/actions/membership-faq";
import { membershipFaqsQueryKey } from "@/lib/queries/membership-faqs";

interface FormValues {
  question: string;
  answer: string;
}

interface EditMembershipFaqDialogProps {
  faq: MembershipFaqData;
}

export function EditMembershipFaqDialog({ faq }: EditMembershipFaqDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      question: faq.question,
      answer: faq.answer,
    },
  });

  function handleOpenChange(next: boolean) {
    if (isPending) return;
    setOpen(next);
    if (!next) reset();
  }

  function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("id", faq._id);
    formData.append("question", values.question);
    formData.append("answer", values.answer);

    startTransition(async () => {
      const result = await updateMembershipFaq(undefined, formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Pregunta frecuente actualizada.");
        setOpen(false);
        await queryClient.invalidateQueries({ queryKey: membershipFaqsQueryKey });
        router.refresh();
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar pregunta frecuente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`edit-question-${faq._id}`}>Pregunta *</Label>
            <Input
              id={`edit-question-${faq._id}`}
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
            <Label htmlFor={`edit-answer-${faq._id}`}>Respuesta *</Label>
            <Textarea
              id={`edit-answer-${faq._id}`}
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
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
