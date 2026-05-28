import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { env } from "@portify/env/server";

function key(): Buffer {
  if (!env.ENCRYPTION_KEY) throw new Error("ENCRYPTION_KEY env var is not set");
  return Buffer.from(env.ENCRYPTION_KEY, "hex");
}

export function encrypt(plaintext: string): string {
  const iv = randomBytes(12); // 96-bit IV for GCM
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), enc].map((b) => b.toString("hex")).join(":");
}

export function decrypt(ciphertext: string): string {
  const parts = ciphertext.split(":");
  const ivHex = parts[0];
  const tagHex = parts[1];
  const encHex = parts[2];
  if (!ivHex || !tagHex || !encHex) throw new Error("Invalid ciphertext format");
  const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(ivHex, "hex"));
  decipher.setAuthTag(Buffer.from(tagHex, "hex"));
  return Buffer.concat([
    decipher.update(Buffer.from(encHex, "hex")),
    decipher.final(),
  ]).toString("utf8");
}
