import { S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME ?? "";
export const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");

let client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (client) return client;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Faltan las variables de entorno de Cloudflare R2 (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY)."
    );
  }

  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return client;
}

export function buildPublicUrl(key: string): string {
  if (!R2_PUBLIC_URL) {
    throw new Error("Falta la variable de entorno R2_PUBLIC_URL.");
  }
  return `${R2_PUBLIC_URL}/${key}`;
}
