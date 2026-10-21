import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-5 text-center text-sea">
      <Wordmark />
      <h1 className="mt-12 font-serif text-[40px] leading-tight md:text-[56px]">This page went back to the kitchen.</h1>
      <div className="mx-auto mt-5 h-0.5 w-16 bg-gold" />
      <Link href="/" className="btn-gold mt-10">
        Back to home
      </Link>
    </main>
  );
}
