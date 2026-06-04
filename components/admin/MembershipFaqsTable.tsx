"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getMembershipFaqs,
  type MembershipFaqData,
} from "@/lib/actions/membership-faq";
import { membershipFaqsQueryKey } from "@/lib/queries/membership-faqs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditMembershipFaqDialog } from "@/components/admin/EditMembershipFaqDialog";
import { DeleteMembershipFaqButton } from "@/components/admin/DeleteMembershipFaqButton";

interface MembershipFaqsTableProps {
  faqs: MembershipFaqData[];
}

export function MembershipFaqsTable({ faqs }: MembershipFaqsTableProps) {
  const { data: items = faqs } = useQuery({
    queryKey: membershipFaqsQueryKey,
    queryFn: async (): Promise<MembershipFaqData[]> => getMembershipFaqs(),
    initialData: faqs,
  });

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <p className="text-muted-foreground text-sm">
          No hay preguntas frecuentes creadas todavía.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pregunta</TableHead>
            <TableHead className="hidden md:table-cell">Respuesta</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((faq) => (
            <TableRow key={faq._id}>
              <TableCell className="font-medium">{faq.question}</TableCell>
              <TableCell className="hidden md:table-cell max-w-[480px] truncate text-muted-foreground">
                {faq.answer}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <EditMembershipFaqDialog faq={faq} />
                  <DeleteMembershipFaqButton
                    id={faq._id}
                    question={faq.question}
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
