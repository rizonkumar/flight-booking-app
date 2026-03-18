"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRightLeft, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAirports } from "@/lib/api";
import type { Airport } from "@/lib/types";

interface SearchFormProps {
  defaultOrigin?: string;
  defaultDestination?: string;
  defaultDate?: string;
  defaultPassengers?: string;
  compact?: boolean;
}

export function SearchForm({
  defaultOrigin = "",
  defaultDestination = "",
  defaultDate = "",
  defaultPassengers = "1",
  compact = false,
}: SearchFormProps) {
  const router = useRouter();
  const [airports, setAirports] = useState<Airport[]>([]);
  const [origin, setOrigin] = useState(defaultOrigin);
  const [destination, setDestination] = useState(defaultDestination);
  const [date, setDate] = useState(defaultDate);
  const [passengers, setPassengers] = useState(defaultPassengers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAirports()
      .then(setAirports)
      .catch(() => setAirports([]))
      .finally(() => setLoading(false));
  }, []);

  function handleSwap() {
    setOrigin(destination);
    setDestination(origin);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (origin && destination) {
      params.set("trips", `${origin}-${destination}`);
    }
    if (date) params.set("tripDate", date);
    if (passengers) params.set("travellers", passengers);
    router.push(`/flights?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={
          compact
            ? "flex flex-col gap-3 sm:flex-row sm:items-end"
            : "flex flex-col gap-4"
        }
      >
        <div
          className={
            compact
              ? "flex flex-1 flex-col gap-3 sm:flex-row"
              : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          <div className="relative flex-1">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/50">
              From
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-border bg-white px-4 text-sm font-medium text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
            >
              <option value="">Select origin</option>
              {airports.map((a) => (
                <option key={a.id} value={a.code}>
                  {a.code} — {a.name}
                </option>
              ))}
            </select>
          </div>

          {!compact && (
            <div className="flex items-end justify-center sm:pb-1">
              <button
                type="button"
                onClick={handleSwap}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink/40 transition-colors hover:border-forest hover:text-forest"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className={compact ? "flex-1" : ""}>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/50">
              To
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-border bg-white px-4 text-sm font-medium text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
            >
              <option value="">Select destination</option>
              {airports.map((a) => (
                <option key={a.id} value={a.code}>
                  {a.code} — {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className={compact ? "flex-1" : ""}>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/50">
              <Calendar className="mr-1 inline h-3 w-3" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 w-full rounded-lg border border-border bg-white px-4 text-sm font-medium text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>

          <div className={compact ? "w-24" : ""}>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/50">
              <Users className="mr-1 inline h-3 w-3" />
              Passengers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-border bg-white px-4 text-sm font-medium text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-12 rounded-lg bg-forest px-8 text-sm font-semibold text-white transition-colors hover:bg-forest-light disabled:opacity-50"
        >
          <Search className="mr-2 h-4 w-4" />
          Search Flights
        </Button>
      </div>
    </form>
  );
}
