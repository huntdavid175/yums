import { Filter } from "lucide-react";
import { FoodCard } from "@/components/FoodCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/firebaseAdmin";

export default async function StorePage() {
  // Fetch products from Firestore server-side
  const snapshot = await db.collection("menuItems").get();
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 relative inline-block">
              Explore Cuisines
              <div className="absolute bottom-[-8px] left-0 right-0 h-1 bg-[#FF6B00]"></div>
            </h1>
            <div className="flex justify-center mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-6 h-6 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="flex justify-center mb-12 overflow-x-auto py-2">
            <div className="flex space-x-2">
              <button className="flex items-center justify-center p-2 rounded-full border border-gray-200">
                <Filter className="h-5 w-5 text-gray-500" />
              </button>
              <button className="px-6 py-2 rounded-full bg-[#FF6B00] text-white font-medium">
                All
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Turkey
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Sausages
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Chicken
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Goat
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Beef
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Pork
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Acq
              </button>
            </div>
          </div>

          {/* Food Grid - Render from Firestore */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {items.map((item: any) => (
              <FoodCard
                key={item.id}
                id={item.id}
                image={item.image || "/placeholder.svg?height=400&width=400"}
                title={item.name}
                price={item.price}
                category={item.category}
                badge={item.badge}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
