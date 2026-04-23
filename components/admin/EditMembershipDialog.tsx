"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { updateMembership, type MembershipData } from "@/lib/actions/membership";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { membershipsQueryKey } from "@/lib/queries/memberships";
import { FeatureTagInput } from "./FeatureTagInput";
interface FormValues {
  name: string;
  price: string;
  description: string;
  features: string[];
  tag: string;
  bottomText: string;
}

interface EditMembershipDialogProps {
  membership: MembershipData;
}

export function EditMembershipDialog({ membership }: EditMembershipDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: membership.name,
      price: String(membership.price),
      description: membership.description,
      features: membership.features,
      tag: membership.tag ?? "",
      bottomText: membership.bottomText ?? "",
    },
  });

  function handleOpenChange(next: boolean) {
    if (isPending) return;
    setOpen(next);
    if (!next) reset();
  }

  function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("id", membership._id);
    (Object.keys(values) as (keyof FormValues)[]).forEach((key) =>
      formData.append(key, Array.isArray(values[key]) ? values[key].join("\n") : values[key])
    );

    startTransition(async () => {
      const result = await updateMembership(undefined, formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Membresía actualizada exitosamente.");
        await queryClient.invalidateQueries({ queryKey: membershipsQueryKey });
        router.refresh();
        setOpen(false);
      }
    });
  }

  const id = membership._id;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <PencilIcon className="size-3.5" />
          <span className="sr-only">Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar membresía</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`edit-name-${id}`}>Nombre *</Label>
              <Input
                id={`edit-name-${id}`}
                aria-invalid={!!errors.name}
                {...register("name", { required: "El nombre es obligatorio." })}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`edit-price-${id}`}>Precio (ARS) *</Label>
              <Input
                id={`edit-price-${id}`}
                type="number"
                min="0"
                step="0.01"
                aria-invalid={!!errors.price}
                {...register("price", {
                  required: "El precio es obligatorio.",
                  min: { value: 0, message: "El precio no puede ser negativo." },
                })}
              />
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`edit-description-${id}`}>Descripción *</Label>
            <Textarea
              id={`edit-description-${id}`}
              rows={2}
              aria-invalid={!!errors.description}
              {...register("description", {
                required: "La descripción es obligatoria.",
              })}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <FeatureTagInput control={control} errors={errors} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`edit-tag-${id}`}>
                Etiqueta{" "}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </Label>
              <Input id={`edit-tag-${id}`} {...register("tag")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`edit-bottomText-${id}`}>
                Texto inferior{" "}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </Label>
              <Input
                id={`edit-bottomText-${id}`}
                {...register("bottomText")}
              />
            </div>
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending} className="bg-primary-500 hover:bg-primary-500/90 text-background-500">
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
