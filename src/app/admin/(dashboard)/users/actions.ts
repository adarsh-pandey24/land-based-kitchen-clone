"use server";

import bcrypt from "bcryptjs";
import { refresh } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { userSchema } from "@/lib/validation";
import { dbError, invalid, str, type FormState } from "@/lib/admin-crud";

// Admin account management. Every action requires the ADMIN role, checked
// against the database, so editors cannot create or promote accounts.

export async function createUser(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = userSchema.safeParse({
    email: str(formData, "email"),
    password: str(formData, "password"),
    role: str(formData, "role"),
  });
  if (!parsed.success) return invalid(parsed.error);
  try {
    await db.adminUser.create({
      data: {
        email: parsed.data.email,
        role: parsed.data.role,
        passwordHash: await bcrypt.hash(parsed.data.password, 12),
      },
    });
  } catch (error) {
    return dbError(error, "email");
  }
  refresh();
  return { success: "Account created." };
}

type Result = { ok: boolean; message: string };
const id = z.string().min(1).max(64);

async function adminCount() {
  return db.adminUser.count({ where: { role: "ADMIN" } });
}

export async function setRole(userId: string, role: string): Promise<Result> {
  const me = await requireAdmin();
  const parsed = z.object({ userId: id, role: z.enum(["ADMIN", "EDITOR"]) }).safeParse({ userId, role });
  if (!parsed.success) return { ok: false, message: "Invalid request." };
  if (parsed.data.userId === me.id) return { ok: false, message: "You cannot change your own role." };
  try {
    const target = await db.adminUser.findUnique({ where: { id: parsed.data.userId } });
    if (!target) return { ok: false, message: "User not found." };
    if (target.role === "ADMIN" && parsed.data.role === "EDITOR" && (await adminCount()) <= 1) {
      return { ok: false, message: "At least one admin is required." };
    }
    await db.adminUser.update({ where: { id: target.id }, data: { role: parsed.data.role } });
  } catch (error) {
    console.error("[admin] setRole failed", error);
    return { ok: false, message: "Could not update role." };
  }
  refresh();
  return { ok: true, message: "Role updated." };
}

export async function deleteUser(userId: string): Promise<Result> {
  const me = await requireAdmin();
  const parsed = id.safeParse(userId);
  if (!parsed.success) return { ok: false, message: "Invalid request." };
  if (parsed.data === me.id) return { ok: false, message: "You cannot delete your own account." };
  try {
    const target = await db.adminUser.findUnique({ where: { id: parsed.data } });
    if (!target) return { ok: false, message: "User not found." };
    if (target.role === "ADMIN" && (await adminCount()) <= 1) {
      return { ok: false, message: "At least one admin is required." };
    }
    await db.adminUser.delete({ where: { id: target.id } });
  } catch (error) {
    console.error("[admin] deleteUser failed", error);
    return { ok: false, message: "Could not delete user." };
  }
  refresh();
  return { ok: true, message: "User deleted." };
}
