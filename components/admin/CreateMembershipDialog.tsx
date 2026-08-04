"use client";

import { useState, useTransition } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";

interface FormValues {
  name: string;
  price: string;
  quarterlyPrice: string;
  priceOnRequest: boolean;
  description: string;
  features: string[];
  tag: string;
  bottomText: string;
  featured: boolean;
}

export function CreateMembershipDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      featured: false,
      priceOnRequest: false,
      features: [],
      price: "",
      quarterlyPrice: "",
    },
  });
  const priceOnRequest = useWatch({ control, name: "priceOnRequest" });

  function handleOpenChange(next: boolean) {
    if (isPending) return;
    setOpen(next);
    if (!next) {
      reset();
    }
  }

  function onSubmit(values: FormValues) {
    const formData = new FormData();
    (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
      if (key === "priceOnRequest") return;
      const value = values[key];
      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else if (Array.isArray(value)) {
        formData.append(key, value.join("\n"));
      } else if (key === "price" || key === "quarterlyPrice") {
        formData.append(key, values.priceOnRequest ? "" : value);
      } else {
        formData.append(key, value);
      }
    });

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
            <div className="flex flex-col gap-1.5 sm:col-span-2">
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

            <div className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3 sm:col-span-2">
              <div className="flex flex-col gap-0.5">
                <Label htmlFor="create-price-on-request">Precio a consultar</Label>
                <p className="text-muted-foreground text-xs">
                  Mostrará &quot;Consultar&quot; en lugar de un monto fijo.
                </p>
              </div>
              <Controller
                name="priceOnRequest"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="create-price-on-request"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked) {
                        setValue("price", "");
                        setValue("quarterlyPrice", "");
                      }
                    }}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-price">
                Precio (ARS) {priceOnRequest ? "" : "*"}
              </Label>
              <Input
                id="create-price"
                type={priceOnRequest ? "text" : "number"}
                min="0"
                step="0.01"
                placeholder={priceOnRequest ? "Consultar" : "15000"}
                disabled={priceOnRequest}
                aria-invalid={!!errors.price}
                {...register("price", {
                  validate: (v) => {
                    if (priceOnRequest) return true;
                    if (!v?.trim()) return "El precio es obligatorio.";
                    if (Number(v) < 0) return "El precio no puede ser negativo.";
                    return true;
                  },
                })}
              />
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-quarterly-price">
                Precio trimestral (ARS){" "}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </Label>
              <Input
                id="create-quarterly-price"
                type={priceOnRequest ? "text" : "number"}
                min="0"
                step="0.01"
                placeholder={priceOnRequest ? "Consultar" : "45000"}
                disabled={priceOnRequest}
                aria-invalid={!!errors.quarterlyPrice}
                {...register("quarterlyPrice", {
                  validate: (v) => {
                    if (priceOnRequest || !v?.trim()) return true;
                    if (Number(v) < 0)
                      return "El precio trimestral no puede ser negativo.";
                    return true;
                  },
                })}
              />
              {errors.quarterlyPrice && (
                <p className="text-xs text-destructive">{errors.quarterlyPrice.message}</p>
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

          <div className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="create-featured">Destacada en home</Label>
              <p className="text-muted-foreground text-xs">
                Mostrar esta membresía en la página principal.
              </p>
            </div>
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <Switch
                  id="create-featured"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
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
