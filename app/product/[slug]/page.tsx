import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { db } from "@/lib/firebaseAdmin";

import ProductClient from "@/components/product/ProductClient";
import { FoodNotFound } from "@/components/FoodNotFound";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
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
  const product: any = {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt ?? null,
    updatedAt: data.updatedAt?.toDate
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt ?? null,
  };

  // Fetch related meals from the same category
  let relatedMeals: any[] = [];
  if (product.category) {
    const relatedQuery = await db
      .collection("menuItems")
      .where("category", "==", product.category)
      .limit(8) // Fetch more to account for filtering
      .get();

    relatedMeals = relatedQuery.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate
          ? doc.data().createdAt.toDate().toISOString()
          : doc.data().createdAt ?? null,
        updatedAt: doc.data().updatedAt?.toDate
          ? doc.data().updatedAt.toDate().toISOString()
          : doc.data().updatedAt ?? null,
      }))
      .filter((meal) => meal.id !== product.id) // Exclude current product
      .slice(0, 4); // Take first 4 after filtering
  }

  // If we don't have enough related meals, fetch some random ones
  if (relatedMeals.length < 4) {
    const randomQuery = await db.collection("menuItems").limit(8).get(); // Fetch more to account for filtering

    const randomMeals = randomQuery.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate
          ? doc.data().createdAt.toDate().toISOString()
          : doc.data().createdAt ?? null,
        updatedAt: doc.data().updatedAt?.toDate
          ? doc.data().updatedAt.toDate().toISOString()
          : doc.data().updatedAt ?? null,
      }))
      .filter((meal) => meal.id !== product.id);

    // Combine and deduplicate
    const allMeals = [...relatedMeals, ...randomMeals];
    const uniqueMeals = allMeals.filter(
      (meal, index, self) => index === self.findIndex((m) => m.id === meal.id)
    );
    relatedMeals = uniqueMeals.slice(0, 4);
  }

  console.log(product);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ProductClient foodData={product} relatedMeals={relatedMeals} />
      <Footer />
    </div>
  );
}
