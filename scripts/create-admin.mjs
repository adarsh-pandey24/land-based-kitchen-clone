// Creates (or resets the password of) an ADMIN account.
//
// Usage (credentials come from the environment, never from source code):
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='long-secret' npm run create-admin
// or set ADMIN_EMAIL / ADMIN_PASSWORD in .env and run `npm run create-admin`.
// Remove ADMIN_PASSWORD from .env afterwards.
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("Set ADMIN_EMAIL to a valid email address.");
  process.exit(1);
}
if (!password || password.length < 12) {
  console.error("Set ADMIN_PASSWORD to at least 12 characters.");
  process.exit(1);
}

const db = new PrismaClient();
try {
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await db.adminUser.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN" },
    create: { email, passwordHash, role: "ADMIN" },
  });
  console.log(`Admin account ready: ${user.email}`);
} catch (error) {
  console.error("Could not create admin account:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await db.$disconnect();
}
