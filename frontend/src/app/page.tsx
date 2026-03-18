import { SearchForm } from "@/components/search-form";
import { Plane, Shield, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    desc: "Your payments and personal data are fully protected",
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    desc: "Get your booking confirmed in seconds",
  },
  {
    icon: CreditCard,
    title: "Best Prices",
    desc: "Competitive fares with no hidden fees",
  },
];

const destinations = [
  { code: "DEL", city: "New Delhi", country: "India" },
  { code: "BOM", city: "Mumbai", country: "India" },
  { code: "BLR", city: "Bangalore", country: "India" },
  { code: "MAA", city: "Chennai", country: "India" },
  { code: "CCU", city: "Kolkata", country: "India" },
  { code: "HYD", city: "Hyderabad", country: "India" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20">
          <div className="mb-12 max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-mint uppercase">
              <Plane className="h-3.5 w-3.5" />
              Book your next flight
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find the best
              <br />
              <span className="text-mint">flight deals</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg">
              Search hundreds of flights and book at the best price.
              Simple, fast, and reliable.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-2xl sm:p-8">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-2xl border border-border p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint/30">
                  <f.icon className="h-5 w-5 text-forest" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/50">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Popular Destinations
            </h2>
            <p className="mt-2 text-sm text-ink/50">
              Explore our most searched routes
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {destinations.map((d) => (
              <div
                key={d.code}
                className="group cursor-pointer rounded-2xl border border-border bg-white p-5 text-center transition-all hover:border-forest/30 hover:shadow-md"
              >
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-mint/30">
                  <span className="font-display text-sm font-bold text-forest">
                    {d.code}
                  </span>
                </div>
                <p className="font-display text-sm font-bold text-ink">
                  {d.city}
                </p>
                <p className="mt-0.5 text-xs text-ink/40">{d.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
