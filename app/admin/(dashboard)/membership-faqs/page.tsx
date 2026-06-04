import { CreateMembershipFaqDialog } from "@/components/admin/CreateMembershipFaqDialog";
import { MembershipFaqsTable } from "@/components/admin/MembershipFaqsTable";
import { getMembershipFaqs } from "@/lib/actions/membership-faq";

export default async function MembershipFaqsPage() {
  const faqs = await getMembershipFaqs();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Preguntas frecuentes
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Gestioná las preguntas frecuentes de membresías.
          </p>
        </div>
        <CreateMembershipFaqDialog />
      </div>

      <MembershipFaqsTable faqs={faqs} />
    </div>
  );
}
