"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { loginSchema } from "@/lib/validation";
import type { FormState } from "@/lib/admin-crud";

// Compared against when the email is unknown, so response time does not reveal
// which emails have accounts.
let dummyHash: string | undefined;
const getDummyHash = () => (dummyHash ??= bcrypt.hashSync("unused-placeholder-password", 12));

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { message: "Enter your email and password." };

  let user;
  try {
    user = await db.adminUser.findUnique({ where: { email: parsed.data.email } });
  } catch (error) {
    console.error("[admin] Login database error", error);
    return { message: "Sign-in is unavailable right now. Check the database connection." };
  }

  const ok = await bcrypt.compare(parsed.data.password, user?.passwordHash ?? getDummyHash());
  if (!user || !ok) return { message: "Invalid email or password." };

  await createSession({ userId: user.id, role: user.role });
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
