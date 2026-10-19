import "server-only";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { db } from "./db";
import { readSession } from "./session";

export type CurrentUser = { id: string; email: string; role: Role };

// Data Access Layer: every protected page and server action calls one of these.
// The session is re-checked against the database so deleted users or changed
// roles take effect immediately.
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await readSession();
  if (!session) return null;
  const user = await db.adminUser.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, role: true },
  });
  return user;
}

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/admin");
  return user;
}
