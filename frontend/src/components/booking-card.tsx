import { Plane, Calendar, Users } from "lucide-react";
import type { Booking } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface BookingCardProps {
  booking: Booking;
}

const statusStyles: Record<string, string> = {
  initiated: "bg-ink/5 text-ink/60 border-ink/10",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  booked: "bg-mint/50 text-forest border-forest/20",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <Link href={`/bookings/${booking.id}`}>
      <div className="group rounded-xl border border-border bg-white p-5 transition-all hover:border-forest/30 hover:shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint/40">
              <Plane className="h-5 w-5 text-forest" />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-ink">
                Booking #{booking.id}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-ink/50">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(booking.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {booking.noOfSeats}{" "}
                  {booking.noOfSeats === 1 ? "seat" : "seats"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-display text-lg font-bold text-ink">
                INR {booking.totalCost.toLocaleString()}
              </p>
            </div>
            <Badge
              className={`rounded-md border px-2.5 py-1 text-xs font-medium capitalize ${
                statusStyles[booking.status] || statusStyles.initiated
              }`}
            >
              {booking.status}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
