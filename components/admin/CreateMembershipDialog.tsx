"use client";

import { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { createMembership } from "@/lib/actions/membership";
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
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { membershipsQueryKey } from "@/lib/queries/memberships";
import { FeatureTagInput } from "./FeatureTagInput";
import MemberShipCard from "@/components/landing/MemberShipCard";
interface FormValues {
  name: string;
  price: string;
  description: string;
  features: string[];
  tag: string;
  bottomText: string;
}

export function CreateMembershipDialog() {
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const watchedName = useWatch({ control, name: "name" });
  const watchedDescription = useWatch({ control, name: "description" });
  const watchedPrice = useWatch({ control, name: "price" });
  const watchedFeatures = useWatch({ control, name: "features" });
  const watchedTag = useWatch({ control, name: "tag" });
  const watchedBottomText = useWatch({ control, name: "bottomText" });

  function handleOpenChange(next: boolean) {
    if (isPending) return;
    setOpen(next);
    if (!next) {
      reset();
      setShowPreview(true);
    }
  }

  function onSubmit(values: FormValues) {
    const formData = new FormData();
    (Object.keys(values) as (keyof FormValues)[]).forEach((key) =>
      formData.append(key, Array.isArray(values[key]) ? values[key].join("\n") : values[key])
    );

    startTransition(async () => {
      const result = await createMembership(undefined, formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Membresía creada exitosamente.");
        reset();
        setOpen(false);
        await queryClient.invalidateQueries({ queryKey: membershipsQueryKey });
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary-500 hover:bg-primary-500/90 text-background-500">
          <PlusIcon />
          Nueva membresía
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear membresía</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-name">Nombre *</Label>
              <Input
                id="create-name"
                placeholder="Plan Premium"
                aria-invalid={!!errors.name}
                {...register("name", { required: "El nombre es obligatorio." })}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-price">Precio (ARS) *</Label>
              <Input
                id="create-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="15000"
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
            <Label htmlFor="create-description">Descripción *</Label>
            <Textarea
              id="create-description"
              placeholder="Describí los beneficios principales..."
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

          {/* <div className="flex flex-col gap-1.5">
            <Label htmlFor="create-features">
              Beneficios *{" "}
              <span className="text-muted-foreground font-normal">
                (uno por línea)
              </span>
            </Label>
            <Textarea
              id="create-features"
              placeholder={"Acceso ilimitado\nClases grupales\nVestuarios"}
              rows={4}
              aria-invalid={!!errors.features}
              {...register("features", {
                required: "Agregá al menos un beneficio.",
                validate: (v) =>
                  Array.isArray(v) && v.some((l) => l.trim()) ||
                  "Agregá al menos un beneficio.",
              })}
            />
            {errors.features && (
              <p className="text-xs text-destructive">
                {errors.features.message}
              </p>
            )}
          </div> */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-tag">
                Etiqueta{" "}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </Label>
              <Input
                id="create-tag"
                placeholder="Más popular"
                {...register("tag")}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-bottomText">
                Texto inferior{" "}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </Label>
              <Input
                id="create-bottomText"
                placeholder="*Consultar condiciones"
                {...register("bottomText")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center mb-2 justify-between gap-2">
              <p className="text-sm font-medium">Vista previa</p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowPreview((prev) => !prev)}
              >
                {showPreview ? "Ocultar" : "Mostrar"}
              </Button>
            </div>
            {showPreview && (
              <MemberShipCard
                membership={{
                  id: "create-preview",
                  name: watchedName?.trim() || "AYMA Plan",
                  description:
                    watchedDescription?.trim() ||
                    "Describí los beneficios principales...",
                  price: Number(watchedPrice || 0),
                  features:
                    Array.isArray(watchedFeatures) && watchedFeatures.length > 0
                      ? watchedFeatures
                      : ["Acceso ilimitado"],
                  tag: watchedTag?.trim() || undefined,
                  bottomText: watchedBottomText?.trim() || undefined,
                }}
              />
            )}
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending} className="bg-primary-500 hover:bg-primary-500/90 text-background-500">
              {isPending ? "Creando..." : "Crear membresía"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
