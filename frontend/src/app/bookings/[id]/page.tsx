"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Plane,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  CreditCard,
  Calendar,
  Users,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { makePayment } from "@/lib/api";
import type { Booking } from "@/lib/types";

const statusStyles: Record<string, string> = {
  initiated: "bg-ink/5 text-ink/60 border-ink/10",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  booked: "bg-mint/50 text-forest border-forest/20",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("skyroute_bookings");
      if (stored) {
        const bookings: Booking[] = JSON.parse(stored);
        const found = bookings.find((b) => b.id === Number(params.id));
        if (found) {
          setBooking(found);
        }
      }
    }
    setLoading(false);
  }, [params.id]);

  async function handlePayment() {
    if (!booking) return;
    setPaying(true);
    setPaymentError("");
    try {
      await makePayment({
        bookingId: booking.id,
        userId: booking.userId,
        totalCost: booking.totalCost,
      });
      setPaymentSuccess(true);

      // Update local storage
      const stored = localStorage.getItem("skyroute_bookings");
      if (stored) {
        const bookings: Booking[] = JSON.parse(stored);
        const updated = bookings.map((b) =>
          b.id === booking.id ? { ...b, status: "booked" as const } : b
        );
        localStorage.setItem("skyroute_bookings", JSON.stringify(updated));
        setBooking({ ...booking, status: "booked" });
      }
    } catch {
      setPaymentError("Payment failed. Please try again.");
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-forest" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <Plane className="mx-auto h-10 w-10 text-ink/20" />
        <p className="mt-4 font-display text-lg font-semibold text-ink">
          Booking not found
        </p>
        <Button
          onClick={() => router.push("/bookings")}
          className="mt-4 bg-forest text-white hover:bg-forest-light"
        >
          View All Bookings
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <button
          onClick={() => router.push("/bookings")}
          className="mb-6 flex items-center gap-2 text-sm text-ink/50 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          All Bookings
        </button>

        {/* Success banner */}
        {paymentSuccess && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-forest/20 bg-mint/30 p-4">
            <CheckCircle2 className="h-5 w-5 text-forest" />
            <div>
              <p className="text-sm font-semibold text-forest">
                Payment successful!
              </p>
              <p className="text-xs text-forest/70">
                Your booking has been confirmed.
              </p>
            </div>
          </div>
        )}

        {/* Booking card */}
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-ink">
              Booking #{booking.id}
            </h1>
            <Badge
              className={`rounded-md border px-3 py-1.5 text-xs font-medium capitalize ${
                statusStyles[booking.status] || statusStyles.initiated
              }`}
            >
              {booking.status}
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 text-xs text-ink/40">
                <Hash className="h-3 w-3" />
                Flight ID
              </div>
              <p className="mt-1 font-display text-sm font-bold text-ink">
                {booking.flightId}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 text-xs text-ink/40">
                <Users className="h-3 w-3" />
                Seats
              </div>
              <p className="mt-1 font-display text-sm font-bold text-ink">
                {booking.noOfSeats}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 text-xs text-ink/40">
                <CreditCard className="h-3 w-3" />
                Total Cost
              </div>
              <p className="mt-1 font-display text-sm font-bold text-ink">
                INR {booking.totalCost.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 text-xs text-ink/40">
                <Calendar className="h-3 w-3" />
                Booked On
              </div>
              <p className="mt-1 font-display text-sm font-bold text-ink">
                {new Date(booking.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Payment section */}
          {booking.status === "initiated" && !paymentSuccess && (
            <div className="mt-6 rounded-xl border border-border bg-secondary p-5">
              <h3 className="font-display text-sm font-bold text-ink">
                Complete Payment
              </h3>
              <p className="mt-1 text-xs text-ink/50">
                Pay INR {booking.totalCost.toLocaleString()} to confirm your
                booking
              </p>

              {paymentError && (
                <p className="mt-3 rounded-lg bg-red-50 p-2.5 text-xs text-red-600">
                  {paymentError}
                </p>
              )}

              <Button
                onClick={handlePayment}
                disabled={paying}
                className="mt-4 h-11 w-full rounded-lg bg-forest text-sm font-semibold text-white transition-colors hover:bg-forest-light disabled:opacity-50"
              >
                {paying ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="mr-2 h-4 w-4" />
                )}
                {paying ? "Processing..." : `Pay INR ${booking.totalCost.toLocaleString()}`}
              </Button>
            </div>
          )}

          {booking.status === "booked" && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-forest/20 bg-mint/20 p-5">
              <CheckCircle2 className="h-6 w-6 text-forest" />
              <div>
                <p className="font-display text-sm font-bold text-forest">
                  Booking Confirmed
                </p>
                <p className="text-xs text-forest/60">
                  Your flight is booked and payment has been received.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
