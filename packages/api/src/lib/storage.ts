import { env } from "@portify/env/server";

export function createS3Client(): Bun.S3Client {
  const { STORAGE_ENDPOINT, STORAGE_BUCKET, STORAGE_ACCESS_KEY_ID, STORAGE_SECRET_ACCESS_KEY } = env;
  if (!STORAGE_ENDPOINT || !STORAGE_BUCKET || !STORAGE_ACCESS_KEY_ID || !STORAGE_SECRET_ACCESS_KEY) {
    throw new Error("Storage is not configured");
  }
  return new Bun.S3Client({
    endpoint: STORAGE_ENDPOINT,
    bucket: STORAGE_BUCKET,
    accessKeyId: STORAGE_ACCESS_KEY_ID,
    secretAccessKey: STORAGE_SECRET_ACCESS_KEY,
    region: "garage",
  });
}

export async function uploadFile(key: string, data: ArrayBuffer, contentType: string): Promise<string> {
  if (!env.STORAGE_PUBLIC_URL) throw new Error("Storage is not configured");
  const client = createS3Client();
  await client.write(key, data, { type: contentType });
  return `${env.STORAGE_PUBLIC_URL}/media/${key}`;
}
