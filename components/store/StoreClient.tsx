"use client";

import { useState } from "react";
import { Filter, MapPin, Clock, Star, ShoppingBag } from "lucide-react";
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
  const filteredItems = items.filter((item: any) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesCategory;
  });

  // Calculate some stats
  const totalItems = items.length;
  const popularItems = items.filter((item: any) => item.isPopular).slice(0, 4);

  return (
    <motion.main
      className="flex-1 py-8 px-4 font-roboto bg-gradient-to-br from-gray-50 to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block font-oswald">
            Explore Cuisines
            <div className="absolute bottom-[-8px] left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Discover delicious meals crafted with fresh ingredients and
            authentic flavors
          </p>
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <MapPin className="h-5 w-5 text-red-500" />
              <span className="text-sm text-gray-600">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 text-red-500" />
              <span className="text-sm text-gray-600">30-45 min</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Star className="h-5 w-5 text-red-500" />
              <span className="text-sm text-gray-600">4.8 Rating</span>
            </div>
          </div>
        </motion.div>

        {/* Popular Items Section */}
        {popularItems.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-oswald">
                  Popular Items
                </h2>
                <p className="text-sm text-gray-500">
                  Most loved by our customers
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {popularItems.map((item: any, index: number) => (
                <FoodCard
                  key={item.id}
                  id={item.id}
                  image={item.image || "/placeholder.svg?height=400&width=400"}
                  title={item.name}
                  price={item.price}
                  category={item.category}
                  badge={item.badge}
                  isPopular={true}
                  rating={4.8}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Filter Categories */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-oswald">All Menu Items</h2>
              <p className="text-sm text-gray-500">Browse by category</p>
            </div>
          </div>
          <div className="flex justify-start md:justify-center overflow-x-auto px-4 scrollbar-hide">
            <div className="flex space-x-2 min-w-max">
              <motion.button
                onClick={() => setSelectedCategory("All")}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === "All"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All ({totalItems})
              </motion.button>
              {categories.map((category) => {
                const categoryCount = items.filter(
                  (item: any) => item.category === category
                ).length;
                return (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category} ({categoryCount})
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Food Grid - Render filtered items */}
        {filteredItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {filteredItems.map((item: any, index: number) => (
              <FoodCard
                key={item.id}
                id={item.id}
                image={item.image || "/placeholder.svg?height=400&width=400"}
                title={item.name}
                price={item.price}
                category={item.category}
                badge={item.badge}
                rating={4.5}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-oswald">
              No items found
            </h3>
            <p className="text-gray-500 mb-4">
              No items available in this category
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm"
            >
              View All Items
            </button>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
