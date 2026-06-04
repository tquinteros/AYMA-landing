"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { MembershipFaqModel } from "@/lib/models/MembershipFaq";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("No autorizado.");
}

export interface MembershipFaqData {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export async function getMembershipFaqs(): Promise<MembershipFaqData[]> {
  await connectDB();
  const faqs = await MembershipFaqModel.find()
    .sort({ createdAt: 1 })
    .lean();

  return JSON.parse(JSON.stringify(faqs));
}

export async function createMembershipFaq(
  _prevState: unknown,
  formData: FormData
) {
  try {
    await requireAdmin();
    await connectDB();

    const question = (formData.get("question") as string)?.trim();
    const answer = (formData.get("answer") as string)?.trim();

    if (!question || !answer) {
      return { error: "Completá todos los campos obligatorios." };
    }

    await MembershipFaqModel.create({ question, answer });

    revalidatePath("/memberships");
    revalidatePath("/admin/membership-faqs");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear la pregunta frecuente." };
  }
}

export async function updateMembershipFaq(
  _prevState: unknown,
  formData: FormData
) {
  try {
    await requireAdmin();
    await connectDB();

    const id = formData.get("id") as string;
    const question = (formData.get("question") as string)?.trim();
    const answer = (formData.get("answer") as string)?.trim();

    if (!id || !question || !answer) {
      return { error: "Completá todos los campos obligatorios." };
    }

    await MembershipFaqModel.findByIdAndUpdate(id, { question, answer });

    revalidatePath("/memberships");
    revalidatePath("/admin/membership-faqs");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar la pregunta frecuente." };
  }
}

export async function deleteMembershipFaq(id: string) {
  try {
    await requireAdmin();
    await connectDB();
    await MembershipFaqModel.findByIdAndDelete(id);

    revalidatePath("/memberships");
    revalidatePath("/admin/membership-faqs");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al eliminar la pregunta frecuente." };
  }
}
