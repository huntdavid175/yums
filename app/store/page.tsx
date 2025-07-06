import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/firebaseAdmin";
import StoreClient from "@/components/store/StoreClient";

export default async function StorePage() {
  // Fetch products from Firestore server-side
  const snapshot = await db.collection("menuItems").get();
  const items = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : data.createdAt ?? null,
      updatedAt: data.updatedAt?.toDate
        ? data.updatedAt.toDate().toISOString()
        : data.updatedAt ?? null,
    };
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <StoreClient items={items} />
      <Footer />
    </div>
  );
}
