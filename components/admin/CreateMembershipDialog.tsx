"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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

const initialState = { error: "", success: false };

export function CreateMembershipDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createMembership,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Membresía creada exitosamente.");
      setOpen(false);
      formRef.current?.reset();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Nueva membresía
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear membresía</DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-name">Nombre *</Label>
              <Input
                id="create-name"
                name="name"
                placeholder="Plan Premium"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="create-price">Precio (ARS) *</Label>
              <Input
                id="create-price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="15000"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="create-description">Descripción *</Label>
            <Textarea
              id="create-description"
              name="description"
              placeholder="Describí los beneficios principales..."
              rows={2}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="create-features">
              Beneficios *{" "}
              <span className="text-muted-foreground font-normal">
                (uno por línea)
              </span>
            </Label>
            <Textarea
              id="create-features"
              name="features"
              placeholder={"Acceso ilimitado\nClases grupales\nVestuarios"}
              rows={4}
              required
            />
          </div>

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
                name="tag"
                placeholder="Más popular"
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
                name="bottomText"
                placeholder="*Consultar condiciones"
              />
            </div>
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creando..." : "Crear membresía"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
