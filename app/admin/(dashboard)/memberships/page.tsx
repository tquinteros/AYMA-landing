import { getMemberships } from "@/lib/actions/membership";
import { MembershipsTable } from "@/components/admin/MembershipsTable";
import { CreateMembershipDialog } from "@/components/admin/CreateMembershipDialog";

export default async function MembershipsPage() {
  const memberships = await getMemberships();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Membresías</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Gestioná los planes y membresías del club.
          </p>
        </div>
        <CreateMembershipDialog />
      </div>

      <MembershipsTable memberships={memberships} />
    </div>
  );
}
