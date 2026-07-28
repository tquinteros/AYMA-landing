"use server";

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, R2_BUCKET_NAME, buildPublicUrl } from "@/lib/r2";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils/slugify";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("No autorizado.");
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export interface UploadImageResult {
  url?: string;
  key?: string;
  error?: string;
}

export async function uploadImage(
  _prevState: unknown,
  formData: FormData
): Promise<UploadImageResult> {
  try {
    await requireAdmin();

    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "blogs";

    if (!file || file.size === 0) {
      return { error: "No se seleccionó ningún archivo." };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return { error: "Formato de imagen no soportado. Usá JPG, PNG, WEBP, GIF o AVIF." };
    }

    if (file.size > MAX_SIZE_BYTES) {
      return { error: "La imagen no puede superar los 5MB." };
    }

    const extension = file.name.includes(".")
      ? file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase()
      : "jpg";
    const baseName = slugify(file.name.replace(/\.[^/.]+$/, "")) || "imagen";
    const key = `${folder}/${crypto.randomUUID()}-${baseName}.${extension}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const client = getR2Client();
    await client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return { url: buildPublicUrl(key), key };
  } catch (error) {
    console.error(error);
    return {
      error:
        error instanceof Error && error.message.includes("R2")
          ? error.message
          : "Error al subir la imagen.",
    };
  }
}

export async function deleteImage(key: string): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireAdmin();
    if (!key) return { success: true };

    const client = getR2Client();
    await client.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
      })
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al eliminar la imagen." };
  }
}
