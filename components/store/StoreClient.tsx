"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { FoodCard } from "@/components/FoodCard";

interface StoreClientProps {
  items: any[];
}

export default function StoreClient({ items }: StoreClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract unique categories from items
  const categories = Array.from(
    new Set(items.map((item: any) => item.category))
  ).filter(Boolean);

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item: any) => item.category === selectedCategory);

  return (
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
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "All"
                  ? "bg-[#FF6B00] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#FF6B00] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Food Grid - Render filtered items */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredItems.map((item: any) => (
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
  );
}
