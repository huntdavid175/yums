"use server";

import { db } from "@/lib/firebaseAdmin";

export type TrackOrderResult =
  | {
      ok: true;
      source: "orders" | "pending-orders";
      order: any;
    }
  | {
      ok: false;
      error: string;
    };

export async function trackOrderAction(
  _: TrackOrderResult,
  formData: FormData
): Promise<TrackOrderResult> {
  try {
    const orderNumberRaw = (formData.get("orderNumber") as string)?.trim();
    const orderDateRaw = (formData.get("orderDate") as string)?.trim(); // expected YYYY-MM-DD

    if (!orderNumberRaw || !orderDateRaw) {
      return { ok: false, error: "Order number and date are required." };
    }

    const orderNumber = Number(orderNumberRaw);
    if (!Number.isFinite(orderNumber)) {
      return { ok: false, error: "Order number must be a number." };
    }

    // Helper to normalize a date-like value to YYYY-MM-DD
    const toDateOnly = (value: any): string | null => {
      try {
        if (!value) return null;
        if (value?.toDate) {
          return value.toDate().toISOString().slice(0, 10);
        }
        const d = new Date(typeof value === "string" ? value : String(value));
        if (isNaN(d.getTime())) return null;
        return d.toISOString().slice(0, 10);
      } catch {
        return null;
      }
    };

    // Search in confirmed orders first
    const ordersSnap = await db
      .collection("orders")
      .where("orderNumber", "==", orderNumber)
      .limit(1)
      .get();

    if (!ordersSnap.empty) {
      const doc = ordersSnap.docs[0];
      const data = doc.data();
      const createdDate = toDateOnly(data.createdAt);
      if (createdDate === orderDateRaw) {
        return { ok: true, source: "orders", order: { id: doc.id, ...data } };
      }
    }

    // If not found, search in pending orders
    const pendingSnap = await db
      .collection("pending-orders")
      .where("orderNumber", "==", orderNumber)
      .limit(1)
      .get();

    if (!pendingSnap.empty) {
      const doc = pendingSnap.docs[0];
      const data = doc.data();
      const createdDate = toDateOnly(data.createdAt);
      if (createdDate === orderDateRaw) {
        return {
          ok: true,
          source: "pending-orders",
          order: { id: doc.id, ...data },
        };
      }
    }

    return {
      ok: false,
      error: "No matching order found for the provided number and date.",
    };
  } catch {
    return {
      ok: false,
      error: "Something went wrong while searching. Please try again.",
    };
  }
}
