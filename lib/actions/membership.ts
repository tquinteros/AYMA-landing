"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { MembershipModel } from "@/lib/models/Membership";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("No autorizado.");
}

export interface MembershipData {
  _id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  tag?: string;
  bottomText?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export async function getMemberships(): Promise<MembershipData[]> {
  await connectDB();
  const memberships = await MembershipModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return JSON.parse(JSON.stringify(memberships));
}

export async function createMembership(
  _prevState: unknown,
  formData: FormData
) {
  try {
    await requireAdmin();
    await connectDB();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const featuresRaw = formData.get("features") as string;
    const features = featuresRaw
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    const tag = (formData.get("tag") as string) || undefined;
    const bottomText = (formData.get("bottomText") as string) || undefined;

    if (!name || !description || isNaN(price) || features.length === 0) {
      return { error: "Completá todos los campos obligatorios." };
    }

    // Place new membership at the end of the list
    const last = await MembershipModel.findOne().sort({ order: -1 }).lean();
    const nextOrder = last ? (last.order ?? 0) + 1 : 0;

    await MembershipModel.create({
      name,
      description,
      price,
      features,
      tag: tag || undefined,
      bottomText: bottomText || undefined,
      order: nextOrder,
    });

    revalidatePath("/admin/memberships");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear la membresía." };
  }
}

export async function updateMembership(
  _prevState: unknown,
  formData: FormData
) {
  try {
    await requireAdmin();
    await connectDB();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const featuresRaw = formData.get("features") as string;
    const features = featuresRaw
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    const tag = (formData.get("tag") as string) || undefined;
    const bottomText = (formData.get("bottomText") as string) || undefined;

    if (!id || !name || !description || isNaN(price) || features.length === 0) {
      return { error: "Completá todos los campos obligatorios." };
    }

    await MembershipModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      features,
      tag: tag || undefined,
      bottomText: bottomText || undefined,
    });

    revalidatePath("/admin/memberships");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar la membresía." };
  }
}

export async function deleteMembership(id: string) {
  try {
    await requireAdmin();
    await connectDB();
    await MembershipModel.findByIdAndDelete(id);
    revalidatePath("/admin/memberships");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al eliminar la membresía." };
  }
}

export async function updateMembershipsOrder(
  orderedIds: string[]
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireAdmin();
    await connectDB();

    await Promise.all(
      orderedIds.map((id, index) =>
        MembershipModel.findByIdAndUpdate(id, { order: index })
      )
    );

    revalidatePath("/admin/memberships");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al guardar el orden." };
  }
}
