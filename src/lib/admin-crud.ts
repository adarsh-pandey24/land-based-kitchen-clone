import "server-only";
import { Prisma } from "@prisma/client";
import type { z } from "zod";

import type { FormState } from "@/components/admin/Fields";

export type { FormState };

export function invalid(error: z.ZodError): FormState {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "form";
    (errors[key] ??= []).push(issue.message);
  }
  return { message: "Please fix the highlighted fields.", errors };
}

// Converts known Prisma errors into safe, user-facing messages.
export function dbError(error: unknown, uniqueField = "slug"): FormState {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = (error.meta?.target as string[] | undefined)?.[0] ?? uniqueField;
      return { message: `That ${target} is already in use.`, errors: { [target]: [`This ${target} is already in use.`] } };
    }
    if (error.code === "P2025") return { message: "This record no longer exists." };
  }
  console.error("[admin] Database error", error);
  return { message: "Could not save changes. Check the database connection and try again." };
}

export const str = (formData: FormData, key: string) => {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
};

export const bool = (formData: FormData, key: string) => formData.get(key) === "on";
