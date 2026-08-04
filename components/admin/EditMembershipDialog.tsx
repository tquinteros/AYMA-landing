"use client";

import { useState, useTransition } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
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

interface EditMembershipDialogProps {
  membership: MembershipData;
}

export function EditMembershipDialog({ membership }: EditMembershipDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const hasDefinedPrice = membership.price !== undefined && membership.price !== null;
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: membership.name,
      price: hasDefinedPrice ? String(membership.price) : "",
      quarterlyPrice:
        membership.quarterlyPrice !== undefined && membership.quarterlyPrice !== null
          ? String(membership.quarterlyPrice)
          : "",
      priceOnRequest: !hasDefinedPrice,
      description: membership.description,
      features: membership.features,
      tag: membership.tag ?? "",
      bottomText: membership.bottomText ?? "",
      featured: membership.featured ?? false,
    },
  });
  const priceOnRequest = useWatch({ control, name: "priceOnRequest" });

  function getFormValuesFromMembership(): FormValues {
    const hasPrice = membership.price !== undefined && membership.price !== null;
    return {
      name: membership.name,
      price: hasPrice ? String(membership.price) : "",
      quarterlyPrice:
        membership.quarterlyPrice !== undefined && membership.quarterlyPrice !== null
          ? String(membership.quarterlyPrice)
          : "",
      priceOnRequest: !hasPrice,
      description: membership.description,
      features: membership.features,
      tag: membership.tag ?? "",
      bottomText: membership.bottomText ?? "",
      featured: membership.featured ?? false,
    };
  }

  function handleOpenChange(next: boolean) {
    if (isPending) return;
    setOpen(next);
    if (next) {
      reset(getFormValuesFromMembership());
    } else {
      reset(getFormValuesFromMembership());
    }
  }

  function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("id", membership._id);
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
            <div className="flex flex-col gap-1.5 sm:col-span-2">
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

            <div className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3 sm:col-span-2">
              <div className="flex flex-col gap-0.5">
                <Label htmlFor={`edit-price-on-request-${id}`}>
                  Precio a consultar
                </Label>
                <p className="text-muted-foreground text-xs">
                  Mostrará &quot;Consultar&quot; en lugar de un monto fijo.
                </p>
              </div>
              <Controller
                name="priceOnRequest"
                control={control}
                render={({ field }) => (
                  <Switch
                    id={`edit-price-on-request-${id}`}
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
              <Label htmlFor={`edit-price-${id}`}>
                Precio (ARS) {priceOnRequest ? "" : "*"}
              </Label>
              <Input
                id={`edit-price-${id}`}
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
              <Label htmlFor={`edit-quarterly-price-${id}`}>
                Precio trimestral (ARS){" "}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </Label>
              <Input
                id={`edit-quarterly-price-${id}`}
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

          <div className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor={`edit-featured-${id}`}>Destacada en home</Label>
              <p className="text-muted-foreground text-xs">
                Mostrar esta membresía en la página principal.
              </p>
            </div>
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <Switch
                  id={`edit-featured-${id}`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
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
