import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  HelpCircle,
  Truck,
  Clock,
  CreditCard,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export default function FAQsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-16 px-4 bg-gray-50 font-roboto">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2 mb-6">
              <HelpCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-gray-700">
                Frequently Asked Questions
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 font-oswald">
              FAQs
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers about ordering, payments, delivery, and support. If
              you can’t find what you need,
              <Link href="/contact" className="text-red-600 font-medium ml-1">
                contact our team
              </Link>
              .
            </p>
          </div>

          <div className="space-y-8">
            {/* Ordering & Menu */}
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900 font-oswald">
                  Ordering & Menu
                </h2>
              </div>
              <div className="space-y-4">
                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    How do I place an order?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    Browse our{" "}
                    <Link href="/store" className="text-red-600 font-medium">
                      Store
                    </Link>
                    , add items to cart, and checkout with your details.
                    You&apos;ll receive a confirmation email/SMS after placing
                    the order.
                  </p>
                </details>

                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    Can I customize portion sizes or add-ons?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    Yes. Many items support size selections and extras. Choose
                    your preferred options on the product page before adding to
                    cart. Add notes at checkout for special instructions.
                  </p>
                </details>

                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    Do you cater for events or large orders?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    We do! For party trays and corporate catering, please reach
                    out via the
                    <Link
                      href="/contact"
                      className="text-red-600 font-medium ml-1"
                    >
                      Contact
                    </Link>{" "}
                    page with your event date, headcount, and menu preferences.
                  </p>
                </details>
              </div>
            </section>

            {/* Payments */}
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-gray-900 font-oswald">
                  Payments
                </h2>
              </div>
              <div className="space-y-4">
                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    What payment methods do you accept?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    We accept card payments and Mobile Money (e.g.,
                    MTN/Vodafone) via Paystack. Cash on delivery may be
                    available in select areas.
                  </p>
                </details>

                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    Is online payment secure?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    Yes. Payments are processed by Paystack using
                    industry-standard encryption and PCI-DSS compliant
                    infrastructure. We never store your full card details.
                  </p>
                </details>
              </div>
            </section>

            {/* Delivery & Pickup */}
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900 font-oswald">
                  Delivery & Pickup
                </h2>
              </div>
              <div className="space-y-4">
                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    What areas do you deliver to?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    We deliver within Legon, East Legon, Madina, and nearby
                    neighborhoods. Fees vary by distance.
                  </p>
                </details>

                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    How long does delivery take?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    Standard delivery is typically 40–60 minutes depending on
                    order volume and location. We’ll notify you if there are any
                    unusual delays.
                  </p>
                </details>

                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    Can I pick up my order?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    Yes. Choose pickup at checkout. We’ll share the pickup
                    address and time once your order is ready.
                  </p>
                </details>
              </div>
            </section>

            {/* Order status & support */}
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-900 font-oswald">
                  Order Status & Support
                </h2>
              </div>
              <div className="space-y-4">
                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    How do I track my order?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    We’ll update you by email/SMS when your order is confirmed,
                    prepared, and out for delivery. For help, reach out via the{" "}
                    <Link href="/contact" className="text-red-600 font-medium">
                      Contact
                    </Link>{" "}
                    page.
                  </p>
                </details>

                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    I need to change my address or phone number after ordering
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    Contact support immediately. Changes may be possible if
                    preparation or dispatch hasn’t started.
                  </p>
                </details>
              </div>
            </section>

            {/* Refunds & issues */}
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900 font-oswald">
                  Refunds & Order Issues
                </h2>
              </div>
              <div className="space-y-4">
                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    What if there’s a problem with my order?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    If items are missing, incorrect, or quality is not as
                    expected upon delivery, contact us within 24 hours with your
                    order number and photos (where applicable). We’ll make it
                    right with a replacement, credit, or refund based on our
                    assessment.
                  </p>
                </details>

                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    When will I receive my refund?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    Card/bank refunds typically complete in 2–7 business days;
                    Mobile Money within 24–72 hours. Timing can vary by bank or
                    provider.
                  </p>
                </details>
              </div>
            </section>

            {/* Location */}
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900 font-oswald">
                  Location & Hours
                </h2>
              </div>
              <div className="space-y-4">
                <details className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
                    Where are you located and what are your hours?
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">
                    We’re at 123 University Road, Legon, Accra, Ghana. Hours:
                    Mon–Fri 11:00–18:30, Sat 09:00–17:00, Sun closed. Check our{" "}
                    <Link href="/contact" className="text-red-600 font-medium">
                      Contact
                    </Link>{" "}
                    page for updates.
                  </p>
                </details>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
