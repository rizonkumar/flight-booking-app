import { Plane } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-forest">
            <Plane className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-display text-sm font-semibold text-ink">
            SkyRoute
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-ink/50">
          <Link href="/" className="hover:text-ink transition-colors">
            Search
          </Link>
          <Link href="/bookings" className="hover:text-ink transition-colors">
            Bookings
          </Link>
        </div>

        <p className="text-xs text-ink/40">
          &copy; {new Date().getFullYear()} SkyRoute
        </p>
      </div>
    </footer>
  );
}
