"use client";

import { type MembershipData } from "@/lib/actions/membership";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EditMembershipDialog } from "@/components/admin/EditMembershipDialog";
import { DeleteMembershipButton } from "@/components/admin/DeleteMembershipButton";

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
  if (memberships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <p className="text-muted-foreground text-sm">
          No hay membresías creadas todavía.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="hidden sm:table-cell">Descripción</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="hidden md:table-cell">Beneficios</TableHead>
            <TableHead className="hidden lg:table-cell">Etiqueta</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberships.map((membership) => (
            <TableRow key={membership._id}>
              <TableCell className="font-medium">
                {membership.name}
              </TableCell>
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
  );
}
