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

const ProductClient = ({ foodData }: { foodData: any }) => {
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

    toast("Added to cart", {
      description: `${quantity} × ${productName} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div>
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image Gallery */}
              <div className="relative">
                <div className="aspect-square relative rounded-lg overflow-hidden">
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
                </div>

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
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div> */}
              </div>

              {/* Product Details */}
              <div>
                <h1 className="text-xl md:text-3xl font-bold mb-2">
                  {foodData.name}
                </h1>
                <div className="inline-block bg-blue-100 text-blue-800 text-xs  px-3 py-1 rounded-full mb-4">
                  {foodData.category}
                </div>

                <h2 className="text-lg md:text-2xl font-bold mb-4 text-gray-900">
                  GH₵{calculateTotalPrice().toFixed(2)}
                </h2>

                <p className="text-gray-600 mb-4">{foodData.description}</p>

                {/* Detailed Description */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {foodData.comesWith}
                  </p>
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Choose Extras */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                    <h3 className="text-base font-bold">Choose Extras</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                    {foodData.extras.map((extra: Extra) => (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-colors ${
                          selectedExtras.includes(extra.id)
                            ? "border-[#FF6B00] bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-xs md:text-sm text-gray-900">
                          {extra.name}
                        </div>
                        <div className="text-[#FF6B00] text-xs md:text-sm font-bold">
                          GH₵{extra.price.toFixed(2)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes Available */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Ruler className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="text-base font-bold">Sizes Available</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {foodData.sizes.map((size: Size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-colors ${
                          selectedSize === size.id
                            ? "border-[#FF6B00] bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-xs md:text-sm text-gray-900">
                          {size.name}
                        </div>
                        <div className="text-[#FF6B00] text-xs md:text-sm font-bold">
                          {size.price === 0
                            ? "Standard"
                            : size.price > 0
                            ? `+GH₵${size.price.toFixed(2)}`
                            : `GH₵${size.price.toFixed(2)}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector and Add to Cart */}
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium mr-4 text-sm md:text-base">
                      Quantity:
                    </span>
                    <button
                      onClick={decrementQuantity}
                      className="p-2 rounded-full border border-gray-300"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="w-12 mx-2 text-center font-medium text-sm md:text-base">
                      {quantity}
                    </div>

                    <button
                      onClick={incrementQuantity}
                      className="p-2 rounded-full border border-gray-300"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>

                    <button
                      className="ml-auto p-2 rounded-full border border-gray-300"
                      aria-label="Share"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                  <Button
                    className="w-full bg-[#FF6B00] hover:bg-[#e05f00] text-white mt-6"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add To Cart
                  </Button>

                  <div className="flex space-x-4">
                    <Link href="/cart" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        Go To Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  );
};

export default ProductClient;
