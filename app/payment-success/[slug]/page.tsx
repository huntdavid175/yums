import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/firebaseAdmin";
import { notFound } from "next/navigation";

import PaymentConfirmationClient from "@/components/payment-confirm/PaymentConfirmationClient";

export default async function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Query orders by document ID (orderId)
  const docRef = db.collection("orders").doc(slug);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    notFound();
  }

  const data = docSnap.data() || {};
  const orderDetails = {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt ?? null,
    updatedAt: data.updatedAt?.toDate
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt ?? null,
    paidAt: data.paidAt?.toDate
      ? data.paidAt.toDate().toISOString()
      : data.paidAt ?? null,
  };

  console.log(orderDetails);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <PaymentConfirmationClient orderDetails={orderDetails} />
      <Footer />
    </div>
  );
}
