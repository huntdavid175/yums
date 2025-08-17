"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle2, AlertTriangle, Search } from "lucide-react";
import { trackOrderAction, type TrackOrderResult } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-red-600 hover:bg-red-700 text-white h-12"
    >
      {pending ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Searching...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4" />
          Track Order
        </>
      )}
    </Button>
  );
}

const formatDateDDMMYY = (value: any): string => {
  try {
    let date: Date | null = null;
    if (value?.toDate) {
      date = value.toDate();
    } else if (typeof value === "string") {
      const d = new Date(value);
      if (!isNaN(d.getTime())) date = d;
    } else if (value instanceof Date) {
      date = value;
    }
    if (!date) return String(value ?? "");
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = String(date.getFullYear());
    return `${dd}/${mm}/${yyyy}`;
  } catch {
    return String(value ?? "");
  }
};

export default function TrackOrderPage() {
  const initialState: TrackOrderResult = { ok: false, error: "" };
  const [state, formAction] = useActionState(trackOrderAction, initialState);

  useEffect(() => {
    // noop, but reserved for future analytics
  }, [state]);

  const renderStatusBadge = (status?: string) => {
    if (!status) return null;
    const base =
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm";
    switch (status) {
      case "pending":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-800`}>
            <Clock className="h-4 w-4" /> Pending
          </span>
        );
      case "paid":
      case "preparing":
      case "out-for-delivery":
        return (
          <span className={`${base} bg-blue-100 text-blue-800`}>
            <Clock className="h-4 w-4" /> {status.replace(/-/g, " ")}
          </span>
        );
      case "delivered":
        return (
          <span className={`${base} bg-green-100 text-green-800`}>
            <CheckCircle2 className="h-4 w-4" /> Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className={`${base} bg-red-100 text-red-800`}>
            <AlertTriangle className="h-4 w-4" /> Cancelled
          </span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-16 px-4 bg-gray-50 font-roboto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2 mb-6">
              <Search className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-gray-700">
                Track Your Order
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 font-oswald">
              Track Order
            </h1>
            <p className="text-gray-600">
              Enter your order number and the date you placed it.
            </p>
          </div>

          <form
            action={formAction}
            className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="orderNumber"
                  className="text-sm font-semibold text-gray-700"
                >
                  Order Number
                </Label>
                <Input
                  id="orderNumber"
                  name="orderNumber"
                  type="text"
                  placeholder="e.g., 1024"
                  required
                  className="mt-1 h-12 border-gray-300 focus:border-red-600 focus:ring-red-600"
                />
              </div>
              <div>
                <Label
                  htmlFor="orderDate"
                  className="text-sm font-semibold text-gray-700"
                >
                  Order Date
                </Label>
                <div className="relative">
                  <Input
                    id="orderDate"
                    name="orderDate"
                    type="date"
                    required
                    className="mt-1 h-12 pr-12 border-gray-300 focus:border-red-600 focus:ring-red-600"
                  />
                </div>
              </div>
            </div>

            <SubmitButton />

            {state && !state.ok && state.error ? (
              <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
                {state.error}
              </div>
            ) : null}

            {state && state.ok ? (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-semibold">{state.order.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Source</p>
                    <p className="font-semibold">
                      {state.source === "orders" ? "Confirmed" : "Pending"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-gray-50">
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="mt-1">
                      {renderStatusBadge(state.order.status)}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border bg-gray-50">
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="mt-1 font-medium capitalize">
                      {state.order.paymentStatus || "pending"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-white">
                    <p className="text-sm text-gray-500">Placed At</p>
                    <p className="mt-1 font-medium">
                      {formatDateDDMMYY(state.order.createdAt)}
                    </p>
                  </div>
                  {state.order.estimatedDelivery ? (
                    <div className="p-4 rounded-lg border bg-white">
                      <p className="text-sm text-gray-500">
                        Estimated Delivery
                      </p>
                      <p className="mt-1 font-medium">
                        {String(state.order.estimatedDelivery)}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="p-4 rounded-lg border bg-white">
                  <p className="text-sm text-gray-500 mb-2">Items</p>
                  <ul className="divide-y">
                    {(state.order.items || []).map((item: any, idx: number) => (
                      <li
                        key={idx}
                        className="py-2 flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-700">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          GH₵ {Number(item.total || 0).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
