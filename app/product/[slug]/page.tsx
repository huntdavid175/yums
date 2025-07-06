import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { db } from "@/lib/firebaseAdmin";

import ProductClient from "@/components/product/ProductClient";
import { FoodNotFound } from "@/components/FoodNotFound";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // const docRef = db.collection("products").doc(params.slug);
  // const docSnap = await docRef.get();
  // if (!docSnap.exists) {
  // Handle not found

  const { slug } = await params;

  const docRef = db.collection("menuItems").doc(slug);
  const docSnap = await docRef.get();
  if (!docSnap.exists) {
    // Handle not found
    return <FoodNotFound />;
  }
  const data = docSnap.data() || {};
  const product = {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt ?? null,
    updatedAt: data.updatedAt?.toDate
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt ?? null,
  };

  console.log(product);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ProductClient foodData={product} />
      <Footer />
    </div>
  );
}
