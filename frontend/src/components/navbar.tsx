"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Search Flights" },
  { href: "/bookings", label: "My Bookings" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest">
            <Plane className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            SkyRoute
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors",
                pathname === link.href
                  ? "bg-forest text-white"
                  : "text-ink/50 hover:text-ink hover:bg-ink/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-ink/50 hover:bg-ink/5 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-white px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                pathname === link.href
                  ? "bg-forest text-white"
                  : "text-ink/50 hover:text-ink hover:bg-ink/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
