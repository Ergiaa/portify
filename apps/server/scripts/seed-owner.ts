import { eq } from "drizzle-orm";
import { db } from "@portify/db";
import { users } from "@portify/db/schema/users";

const email = process.env.OWNER_EMAIL;
const password = process.env.OWNER_PASSWORD;

if (!email || !password) {
  console.error("Set OWNER_EMAIL and OWNER_PASSWORD env vars before running.");
  process.exit(1);
}

const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.role, "owner")).limit(1);

if (existing) {
  console.log("Owner already exists, skipping.");
  process.exit(0);
}

const passwordHash = await Bun.password.hash(password, { algorithm: "argon2id" });
const result = await db
  .insert(users)
  .values({ email, passwordHash, role: "owner" })
  .returning({ id: users.id, email: users.email });

const owner = result[0];
if (!owner) {
  console.error("Failed to create owner.");
  process.exit(1);
}

console.log(`Owner created: ${owner.email} (${owner.id})`);
process.exit(0);
