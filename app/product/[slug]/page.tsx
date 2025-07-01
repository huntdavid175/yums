import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { db } from "@/lib/firebaseAdmin";

import ProductClient from "@/components/product/ProductClient";

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

  const docRef = db.collection("food-items").doc(slug);
  const docSnap = await docRef.get();
  if (!docSnap.exists) {
    // Handle not found
    console.log("Product not found");
  }
  const product = { id: docSnap.id, ...docSnap.data() };

  console.log(product);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ProductClient foodData={product} />
      <Footer />
    </div>
  );
}
