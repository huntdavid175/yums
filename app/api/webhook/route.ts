import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  // Paystack sends the signature in this header
  const paystackSignature = req.headers.get("x-paystack-signature");
  const secret = process.env.PAYSTACK_SECRET_KEY;

  // Get raw body for signature verification
  const rawBody = await req.text();

  // Verify signature
  const hash = crypto
    .createHmac("sha512", secret!)
    .update(rawBody)
    .digest("hex");

  if (hash !== paystackSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Parse event
  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    console.log(event);
    const orderId = event.data.metadata?.orderId;
    if (!orderId) {
      return NextResponse.json(
        { error: "No orderId in metadata" },
        { status: 400 }
      );
    }
    // Fetch the order from Firestore using the orderId (which is the document ID)
    const orderDoc = await db.collection("pending-orders").doc(orderId).get();
    if (!orderDoc.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    const orderData = orderDoc.data();
    console.log("Order found:", orderData);

    // Calculate estimated delivery time (paidAt + 40 minutes)
    const paidAt = new Date(event.data.paidAt);
    const deliveryTime = new Date(paidAt.getTime() + 40 * 60000); // 40 minutes
    const hours = deliveryTime.getHours();
    const minutes = deliveryTime.getMinutes();
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const estimatedDelivery = `${formattedHours}:${formattedMinutes} ${amPm}`;

    // Update the order status to 'paid'
    await db.collection("pending-orders").doc(orderId).update({
      status: "paid",
      paymentStatus: "paid",
      updatedAt: new Date().toISOString(),
    });
    // Move the order to the 'orders' collection
    await db
      .collection("orders")
      .doc(orderId)
      .set({
        ...orderData,
        paymentStatus: "paid",
        paymentMethod: event.data.channel,
        bank: event.data.authorization?.bank || null,
        paidAt: paidAt.toISOString(),
        estimatedDelivery,
        updatedAt: new Date().toISOString(),
      });
    // Delete the order from 'pending-orders'
    await db.collection("pending-orders").doc(orderId).delete();
  }

  // Respond to Paystack
  return NextResponse.json({ received: true });
}
