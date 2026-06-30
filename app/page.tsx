import Link from "next/link";
import { CalendarDays } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-[#f9fbf9] text-center">
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EAF2EE] text-[#2C5E43] border border-[#76B095]/30 uppercase tracking-widest">
        Science Council · TISKL
      </span>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2C5E43] tracking-tight">
        Science &amp; Innovation Challenge
      </h1>
      <p className="max-w-xl text-gray-500">
        View the full competition timeline, participation portals, and project
        toolkit.
      </p>
      <Link
        href="/timeline"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#2C5E43] hover:bg-[#1C3D2B] transition-colors shadow-sm"
      >
        <CalendarDays className="w-4 h-4" /> Open Timeline
      </Link>
    </main>
  );
}
