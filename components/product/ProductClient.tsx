"use client";

import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  // ChevronLeft,
  // ChevronRight,
  Minus,
  Plus,
  Sparkles,
  Ruler,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { FoodCard } from "@/components/FoodCard";

interface Extra {
  id: string;
  name: string;
  price: number;
}

interface Size {
  id: string;
  name: string;
  price: number;
}

const ProductClient = ({
  foodData,
  relatedMeals = [],
}: {
  foodData: any;
  relatedMeals?: any[];
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState("medium");
  const { addToCart } = useCart();

  // This would normally come from a database or API based on the slug

  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const nextImage = () => {
  //   setCurrentImageIndex((prev) => (prev + 1) % foodData?.images.length);
  // };

  // const prevImage = () => {
  //   setCurrentImageIndex(
  //     (prev) => (prev - 1 + foodData?.images.length) % foodData?.images.length
  //   );
  // };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateTotalPrice = () => {
    const selectedSizeObj = foodData.sizes.find(
      (size: Size) => size.id === selectedSize
    );
    const sizePrice = selectedSizeObj ? selectedSizeObj.price : 0;

    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = foodData.extras.find((e: Extra) => e.id === extraId);
      return total + (extra ? extra.price : 0);
    }, 0);

    return foodData.price + sizePrice + extrasPrice;
  };

  const handleAddToCart = () => {
    const totalPrice = calculateTotalPrice();
    const selectedExtrasNames = selectedExtras
      .map((id) => foodData.extras.find((e: Extra) => e.id === id)?.name)
      .filter(Boolean);
    const selectedSizeName = foodData.sizes.find(
      (s: Size) => s.id === selectedSize
    )?.name;

    const customizations = [];
    if (selectedSizeName && selectedSizeName !== "Medium Pack") {
      customizations.push(selectedSizeName);
    }
    if (selectedExtrasNames.length > 0) {
      customizations.push(`Extras: ${selectedExtrasNames.join(", ")}`);
    }

    const productName =
      customizations.length > 0
        ? `${foodData.name} (${customizations.join(", ")})`
        : foodData.name;

    addToCart(
      {
        id: foodData.id,
        name: productName,
        price: `GH₵${totalPrice.toFixed(2)}`,
        image: foodData.image,
        category: foodData.category,
        extras: selectedExtras,
        size: selectedSize,
      },
      quantity
    );

    toast.success("Added to cart", {
      description: `${quantity} × ${productName} has been added to your cart.`,
      duration: 3000,
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="font-roboto"
    >
      <motion.main
        className="flex-1 py-8 px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-sm p-6"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image Gallery */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.div
                  className="aspect-square relative rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={foodData.image || "/placeholder.svg"}
                    alt={foodData.name}
                    fill
                    className="object-cover"
                  />

                  {/* Navigation Arrows */}
                  {/* <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button> */}
                </motion.div>

                {/* Thumbnails */}
                {/* <div className="flex mt-4 space-x-2">
                  {foodData?.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-[#FF6B00]"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${foodData.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div> */}
              </motion.div>

              {/* Product Details */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {/* Product Header */}
                <div>
                  <motion.div
                    className="flex items-center mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                      {foodData.category}
                    </span>
                  </motion.div>
                  <motion.h1
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-oswald"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    {foodData.name}
                  </motion.h1>
                  <motion.div
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                      <span className="text-gray-600 text-sm ml-2">(4.8)</span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold text-red-500 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    GH₵{foodData.price}
                  </motion.div>
                </div>

                {/* Description */}
                <motion.div
                  className="text-gray-600 text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                >
                  {foodData.description}
                </motion.div>

                {/* Extras Available */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                >
                  <div className="flex items-center mb-4">
                    <Sparkles className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="text-base font-bold font-oswald">
                      Extras Available
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-3">
                    {foodData.extras.map((extra: Extra, index: number) => (
                      <motion.button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all duration-300 relative ${
                          selectedExtras.includes(extra.id)
                            ? "border-red-500 bg-red-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: selectedExtras.includes(extra.id) ? 1.05 : 1,
                          rotate: selectedExtras.includes(extra.id)
                            ? [0, -2, 2, 0]
                            : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 1.1 + index * 0.05,
                          scale: { duration: 0.2 },
                          rotate: { duration: 0.3 },
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="font-medium text-xs md:text-sm text-gray-900"
                          animate={{
                            color: selectedExtras.includes(extra.id)
                              ? "#dc2626"
                              : "#111827",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {extra.name}
                        </motion.div>
                        <motion.div
                          className="text-red-500 text-xs md:text-sm font-bold"
                          animate={{
                            scale: selectedExtras.includes(extra.id) ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          GH₵{extra.price.toFixed(2)}
                        </motion.div>
                        {selectedExtras.includes(extra.id) && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                          >
                            <motion.div
                              initial={{ rotate: -90, scale: 0 }}
                              animate={{ rotate: 0, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="text-white text-xs font-bold"
                            >
                              ✓
                            </motion.div>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Sizes Available */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.4 }}
                >
                  <div className="flex items-center mb-4">
                    <Ruler className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="text-base font-bold font-oswald">
                      Sizes Available
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {foodData.sizes.map((size: Size, index: number) => (
                      <motion.button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all duration-300 relative ${
                          selectedSize === size.id
                            ? "border-red-500 bg-red-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: selectedSize === size.id ? 1.05 : 1,
                          rotate: selectedSize === size.id ? [0, -2, 2, 0] : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 1.5 + index * 0.05,
                          scale: { duration: 0.2 },
                          rotate: { duration: 0.3 },
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="font-medium text-xs md:text-sm text-gray-900"
                          animate={{
                            color:
                              selectedSize === size.id ? "#dc2626" : "#111827",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {size.name}
                        </motion.div>
                        <motion.div
                          className="text-red-500 text-xs md:text-sm font-bold"
                          animate={{
                            scale: selectedSize === size.id ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {size.price === 0
                            ? "Standard"
                            : size.price > 0
                            ? `+GH₵${size.price.toFixed(2)}`
                            : `GH₵${size.price.toFixed(2)}`}
                        </motion.div>
                        {selectedSize === size.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                          >
                            <motion.div
                              initial={{ rotate: -90, scale: 0 }}
                              animate={{ rotate: 0, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="text-white text-xs font-bold"
                            >
                              ✓
                            </motion.div>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Quantity Selector and Add to Cart */}
                <motion.div
                  className="flex flex-col space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.7 }}
                >
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium mr-4 text-sm md:text-base">
                      Quantity:
                    </span>
                    <motion.button
                      onClick={decrementQuantity}
                      className="p-2 rounded-full border border-gray-300"
                      aria-label="Decrease quantity"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>

                    <div className="w-12 mx-2 text-center font-medium text-sm md:text-base">
                      {quantity}
                    </div>

                    <motion.button
                      onClick={incrementQuantity}
                      className="p-2 rounded-full border border-gray-300"
                      aria-label="Increase quantity"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>

                    <motion.button
                      className="ml-auto p-2 rounded-full border border-gray-300"
                      aria-label="Share"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="h-4 w-4" />
                    </motion.button>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-red-500 hover:bg-red-600 text-white mt-6"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add To Cart
                    </Button>
                  </motion.div>

                  <div className="flex space-x-4">
                    <Link href="/cart" className="flex-1">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          Go To Cart
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Related Meals Section */}
          {relatedMeals.length > 0 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-oswald mb-2">
                  You Might Also Like
                </h2>
                <p className="text-gray-600 text-sm">
                  Discover more delicious options from our menu
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedMeals.map((meal: any, index: number) => (
                  <FoodCard
                    key={meal.id}
                    id={meal.id}
                    image={
                      meal.image || "/placeholder.svg?height=400&width=400"
                    }
                    title={meal.name}
                    price={meal.price}
                    category={meal.category}
                    badge={meal.badge}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.main>

      <Toaster />
    </motion.div>
  );
};

export default ProductClient;
