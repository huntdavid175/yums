"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { FoodCard } from "@/components/FoodCard";
import { motion } from "framer-motion";

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
    <motion.main
      className="flex-1 py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-2 relative inline-block">
            Explore Cuisines
            <div className="absolute bottom-[-8px] left-0 right-0 h-1 bg-red-500"></div>
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
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          className="mb-12 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex justify-start md:justify-center overflow-x-auto px-4 scrollbar-hide">
            <div className="flex space-x-2 min-w-max">
              <motion.button
                className="flex items-center justify-center p-2 rounded-full border border-gray-200 bg-white shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="h-5 w-5 text-gray-500" />
              </motion.button>
              <motion.button
                onClick={() => setSelectedCategory("All")}
                className={`px-6 py-2 rounded-full font-medium text-xs md:text-sm transition-colors ${
                  selectedCategory === "All"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium text-xs md:text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Food Grid - Render filtered items */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredItems.map((item: any, index: number) => (
            <FoodCard
              key={item.id}
              id={item.id}
              image={item.image || "/placeholder.svg?height=400&width=400"}
              title={item.name}
              price={item.price}
              category={item.category}
              badge={item.badge}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.main>
  );
}
