import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ShieldCheck,
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  HelpCircle,
} from "lucide-react";

export default function RefundsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-16 px-4 bg-gray-50 font-roboto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                Refunds & Customer Protection
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 font-oswald">
              Refunds & Returns Policy
            </h1>
            <p className="text-gray-600">Effective: July 1, 2025</p>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 font-oswald">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At YUMS, your satisfaction is important to us. Because most of
                our products are freshly prepared food items, refund eligibility
                is different from typical retail goods. This policy explains
                when refunds, credits, or replacements may be issued, and how to
                request them.
              </p>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900 font-oswald">
                  Eligible for Refund, Credit, or Replacement
                </h3>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <span className="font-medium">Wrong or missing items</span> in
                  your order (report within 24 hours).
                </li>
                <li>
                  <span className="font-medium">Quality issues on arrival</span>{" "}
                  (e.g., damaged packaging, spoiled, excessively cold) with
                  clear photos provided upon delivery.
                </li>
                <li>
                  <span className="font-medium">Undelivered orders</span> or{" "}
                  <span className="font-medium">significant delays</span> beyond
                  the quoted delivery window where you choose not to accept the
                  order on arrival.
                </li>
                <li>
                  <span className="font-medium">Cancellation</span> made
                  promptly:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>
                      Standard orders: within 5 minutes of placing the order,
                      provided preparation has not started.
                    </li>
                    <li>
                      Catering/large orders: at least 24–48 hours before
                      fulfillment, as stated at booking time.
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900 font-oswald">
                  Not Eligible
                </h3>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Change of mind after food has been prepared or delivered.
                </li>
                <li>
                  Partially consumed items without a documented quality issue at
                  delivery.
                </li>
                <li>
                  Incorrect delivery details provided by the customer, missed
                  delivery, or inability to receive the order on arrival.
                </li>
                <li>
                  Allergy or dietary needs not disclosed at the time of
                  ordering.
                </li>
                <li>
                  Gift cards, promo codes, and service fees, unless legally
                  required.
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900 font-oswald">
                  How to Request a Refund or Replacement
                </h3>
              </div>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>
                  Contact us within{" "}
                  <span className="font-medium">24 hours</span> of delivery (or
                  expected delivery time).
                </li>
                <li>
                  Provide your <span className="font-medium">order number</span>
                  , a description of the issue, and clear{" "}
                  <span className="font-medium">photos</span> if applicable.
                </li>
                <li>
                  Tell us your preference:{" "}
                  <span className="font-medium">
                    refund to original payment method
                  </span>
                  , <span className="font-medium">store credit</span>, or{" "}
                  <span className="font-medium">replacement</span> (subject to
                  availability).
                </li>
              </ol>
              <p className="text-gray-600 mt-4">
                We may require the courier or staff to verify the issue at the
                delivery location when feasible.
              </p>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-bold text-gray-900 font-oswald">
                  Refund Method & Timelines
                </h3>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Refunds are processed to the{" "}
                  <span className="font-medium">original payment method</span>{" "}
                  (e.g., card/MoMo via Paystack) unless you choose store credit.
                </li>
                <li>
                  <span className="font-medium">Processing time</span>:
                  typically 2–7 business days for cards/banks; 24–72 hours for
                  mobile money. Actual timing depends on your bank/provider.
                </li>
                <li>
                  If only part of the order is affected, we may issue a{" "}
                  <span className="font-medium">partial refund</span> for the
                  impacted items.
                </li>
                <li>
                  <span className="font-medium">Delivery fees</span> are
                  refundable only when the issue is caused by us (e.g.,
                  non-delivery, wrong address by our team).
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-900 font-oswald">
                  Cancellations
                </h3>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Standard orders can be cancelled within{" "}
                  <span className="font-medium">5 minutes</span> if preparation
                  has not started.
                </li>
                <li>
                  Catering/large orders follow the{" "}
                  <span className="font-medium">lead time</span> agreed at
                  booking. Deposits may be non-refundable after the cutoff.
                </li>
                <li>
                  If we cancel due to inventory, safety, or operational issues,
                  you will receive a full refund or can opt for store credit.
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900 font-oswald">
                  Disputes & Chargebacks
                </h3>
              </div>
              <p className="text-gray-700">
                If you are considering a chargeback, please contact us first.
                Most issues can be resolved quickly. Filing a chargeback may
                delay resolution while your bank and payment processor complete
                their review.
              </p>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-oswald">
                Contact
              </h3>
              <p className="text-gray-700">
                For refund requests or questions, reach our support team:
              </p>
              <ul className="mt-3 text-gray-700 space-y-1">
                <li>
                  Email: <span className="font-medium">support@yums.store</span>
                </li>
                <li>
                  Orders: <span className="font-medium">orders@yums.store</span>
                </li>
                <li>
                  Phone: <span className="font-medium">+233 24 123 4567</span> /{" "}
                  <span className="font-medium">+233 20 987 6543</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-oswald">
                Updates to this Policy
              </h3>
              <p className="text-gray-700">
                We may update this policy to reflect operational or legal
                changes. The latest version will always be available on this
                page. Continued use of our services after an update indicates
                acceptance of the revised terms.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
