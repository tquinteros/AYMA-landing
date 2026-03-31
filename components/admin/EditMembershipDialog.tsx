"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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

const initialState = { error: "", success: false };

interface EditMembershipDialogProps {
  membership: MembershipData;
}

export function EditMembershipDialog({ membership }: EditMembershipDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    updateMembership,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Membresía actualizada exitosamente.");
      setOpen(false);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={membership._id} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`edit-name-${membership._id}`}>Nombre *</Label>
              <Input
                id={`edit-name-${membership._id}`}
                name="name"
                defaultValue={membership.name}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`edit-price-${membership._id}`}>
                Precio (ARS) *
              </Label>
              <Input
                id={`edit-price-${membership._id}`}
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={membership.price}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`edit-description-${membership._id}`}>
              Descripción *
            </Label>
            <Textarea
              id={`edit-description-${membership._id}`}
              name="description"
              defaultValue={membership.description}
              rows={2}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`edit-features-${membership._id}`}>
              Beneficios *{" "}
              <span className="text-muted-foreground font-normal">
                (uno por línea)
              </span>
            </Label>
            <Textarea
              id={`edit-features-${membership._id}`}
              name="features"
              defaultValue={membership.features.join("\n")}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`edit-tag-${membership._id}`}>
                Etiqueta{" "}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </Label>
              <Input
                id={`edit-tag-${membership._id}`}
                name="tag"
                defaultValue={membership.tag ?? ""}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`edit-bottomText-${membership._id}`}>
                Texto inferior{" "}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </Label>
              <Input
                id={`edit-bottomText-${membership._id}`}
                name="bottomText"
                defaultValue={membership.bottomText ?? ""}
              />
            </div>
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
