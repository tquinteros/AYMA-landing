"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMemberships,
  type MembershipData,
  updateMembershipsOrder,
} from "@/lib/actions/membership";
import { membershipsQueryKey } from "@/lib/queries/memberships";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditMembershipDialog } from "@/components/admin/EditMembershipDialog";
import { DeleteMembershipButton } from "@/components/admin/DeleteMembershipButton";
import { GripVertical, Save } from "lucide-react";
import { toast } from "sonner";

interface MembershipsTableProps {
  memberships: MembershipData[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function MembershipsTable({ memberships }: MembershipsTableProps) {
  const queryClient = useQueryClient();
  const { data: queriedMemberships = memberships } = useQuery({
    queryKey: membershipsQueryKey,
    queryFn: async (): Promise<MembershipData[]> => getMemberships(),
    initialData: memberships,
  });

  const [items, setItems] = useState(queriedMemberships);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, startSaving] = useTransition();
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const handleSortEnd = useCallback(() => {
    if (!tbodyRef.current) return;
    const rows = tbodyRef.current.querySelectorAll<HTMLTableRowElement>("tr[data-id]");
    const newOrder = Array.from(rows).map((r) => r.dataset.id!);
    setItems((prev) => {
      const map = new Map(prev.map((m) => [m._id, m]));
      return newOrder.map((id) => map.get(id)!).filter(Boolean);
    });
    setIsDirty(true);
  }, []);

  useEffect(() => {
    if (!tbodyRef.current) return;
    const el = tbodyRef.current;
    let instance: { destroy: () => void } | null = null;
    let cancelled = false;

    import("sortablejs").then((mod) => {
      if (cancelled) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SortableClass = (mod as any).default ?? mod;
      instance = SortableClass.create(el, {
        animation: 150,
        handle: "[data-drag-handle]",
        ghostClass: "opacity-40",
        chosenClass: "bg-muted",
        forceFallback: true,
        fallbackOnBody: true,
        fallbackTolerance: 5,
        delay: 200,
        delayOnTouchOnly: true,
        touchStartThreshold: 5,
        onEnd: handleSortEnd,
      });
    });

    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [handleSortEnd]);

  useEffect(() => {
    setItems(queriedMemberships);
  }, [queriedMemberships]);

  function handleSave() {
    startSaving(async () => {
      const result = await updateMembershipsOrder(items.map((m) => m._id));
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Orden guardado.");
        setIsDirty(false);
        await queryClient.invalidateQueries({ queryKey: membershipsQueryKey });
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <p className="text-muted-foreground text-sm">
          No hay membresías creadas todavía.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm transition-all duration-200 ${
          isDirty ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="text-muted-foreground">
          El orden fue modificado. Guardá los cambios para aplicarlos.
        </span>
        <Button size="sm" onClick={handleSave} disabled={isSaving}>
          <Save className="size-3.5" />
          {isSaving ? "Guardando..." : "Guardar orden"}
        </Button>
      </div>

      <div className="rounded-xl border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden sm:table-cell">Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="hidden md:table-cell">Beneficios</TableHead>
              <TableHead className="hidden lg:table-cell">Etiqueta</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody ref={tbodyRef}>
            {items.map((membership) => (
              <TableRow key={membership._id} data-id={membership._id}>
                <TableCell className="w-8 pr-0 align-middle">
                  <span
                    data-drag-handle
                    role="button"
                    tabIndex={0}
                    aria-label="Arrastrar para reordenar"
                    className="flex min-h-11 min-w-11 cursor-grab touch-none select-none items-center justify-center text-muted-foreground/50 active:cursor-grabbing hover:text-muted-foreground [-webkit-user-drag:none]"
                    title="Mantené presionado y arrastrá (celular)"
                  >
                    <GripVertical className="size-5 sm:size-4" />
                  </span>
                </TableCell>
                <TableCell className="font-medium">{membership.name}</TableCell>
                <TableCell className="hidden sm:table-cell max-w-[200px] truncate text-muted-foreground">
                  {membership.description}
                </TableCell>
                <TableCell className="font-medium tabular-nums">
                  {formatPrice(membership.price)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-muted-foreground text-xs">
                    {membership.features.length} beneficio
                    {membership.features.length !== 1 ? "s" : ""}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {membership.tag ? (
                    <Badge variant="secondary">{membership.tag}</Badge>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <EditMembershipDialog membership={membership} />
                    <DeleteMembershipButton
                      id={membership._id}
                      name={membership.name}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
