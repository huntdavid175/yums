"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Delivery fee
  const deliveryFee = 20.0;

  // Total
  const total = cartTotal + deliveryFee;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Link href="/store">
                <Button className="bg-[#FF6B00] hover:bg-[#e05f00] text-white">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Cart Items ({cartItems.length})
                    </h2>

                    <div className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="py-6 flex flex-col sm:flex-row gap-4"
                        >
                          <div className="flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="rounded-lg object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-medium text-sm md:text-base">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                              {item.category}
                            </p>
                            <p className="text-[#FF6B00] font-bold text-sm md:text-base">
                              {item.price}
                            </p>

                            <div className="flex items-center mt-4">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1 rounded-full border border-gray-300"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </button>

                              <div className="w-10 mx-2 text-center font-medium text-sm">
                                {item.quantity}
                              </div>

                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1 rounded-full border border-gray-300"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>

                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto p-2 text-red-500 hover:text-red-700"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-base font-semibold mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-4">
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="text-gray-600 ">Subtotal</span>
                        <span className="font-medium">
                          GH₵{cartTotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm md:text-base">
                        <span className="text-gray-600 ">Delivery Fee</span>
                        <span className="font-medium">
                          GH₵{deliveryFee.toFixed(2)}
                        </span>
                      </div>

                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-[#FF6B00]">
                            GH₵{total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <Link href="/checkout" className="w-full">
                        <Button className="w-full bg-[#FF6B00] hover:bg-[#e05f00] text-white mt-6">
                          Proceed to Checkout
                        </Button>
                      </Link>

                      <Link href="/store">
                        <Button variant="outline" className="w-full mt-2">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
