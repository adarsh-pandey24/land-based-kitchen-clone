import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-md bg-white p-8 shadow-xl md:p-10">
        <p className="eyebrow text-center">{site.name}</p>
        <h1 className="mt-3 text-center font-serif text-3xl">Admin sign in</h1>
        <div className="mx-auto mt-5 h-px w-16 bg-gold" />
        <LoginForm />
        <p className="mt-8 text-center text-sm text-muted">
          <Link href="/" className="hover:text-gold">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
