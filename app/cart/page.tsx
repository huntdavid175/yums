"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/helpers/helper";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Delivery fee
  const deliveryFee = 0.0;

  // Total
  const total = cartTotal + deliveryFee;

  return (
    <motion.div
      className="flex min-h-screen flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header />

      <motion.main
        className="flex-1 py-8 px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Your Cart
          </motion.h1>

          {cartItems.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <motion.h2
                className="text-2xl font-medium mb-4"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                Your cart is empty
              </motion.h2>
              <motion.p
                className="text-gray-500 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                Looks like you haven&apos;t added any items to your cart yet.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/store">
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    Continue Shopping
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {/* Cart Items */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <motion.div
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <div className="p-6">
                    <motion.h2
                      className="text-xl font-semibold mb-4"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      Cart Items ({cartItems.length})
                    </motion.h2>

                    <div className="divide-y divide-gray-200">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="py-6 flex flex-col sm:flex-row gap-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.7 + index * 0.05,
                          }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <motion.div
                            className="flex-shrink-0"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="rounded-lg object-cover"
                            />
                          </motion.div>

                          <div className="flex-1">
                            <h3 className="font-medium text-sm md:text-base">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                              {item.category}
                            </p>
                            <p className="text-red-500 font-bold text-sm md:text-base">
                              {item.price}
                            </p>

                            <div className="flex items-center mt-4">
                              <motion.button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1 rounded-full border border-gray-300"
                                aria-label="Decrease quantity"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus className="h-4 w-4" />
                              </motion.button>

                              <div className="w-10 mx-2 text-center font-medium text-sm">
                                {item.quantity}
                              </div>

                              <motion.button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1 rounded-full border border-gray-300"
                                aria-label="Increase quantity"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus className="h-4 w-4" />
                              </motion.button>

                              <motion.button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto p-2 text-red-500 hover:text-red-700"
                                aria-label="Remove item"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="h-5 w-5" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <motion.div
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <div className="p-6">
                    <motion.h2
                      className="text-base font-semibold mb-4"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      Order Summary
                    </motion.h2>

                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    >
                      <motion.div
                        className="flex justify-between text-sm md:text-base"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                      >
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">
                          GH₵{cartTotal.toFixed(2)}
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex justify-between text-sm md:text-base"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.0 }}
                      >
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">
                          GH₵{deliveryFee.toFixed(2)}
                        </span>
                      </motion.div>

                      <motion.div
                        className="border-t border-gray-200 pt-4 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                      >
                        <motion.div
                          className="flex justify-between font-bold"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 1.2 }}
                        >
                          <span>Total</span>
                          <span className="text-red-500">
                            GH₵{formatCurrency(total)}
                          </span>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href="/checkout" className="w-full">
                          <Button className="w-full bg-red-500 hover:bg-red-600 text-white mt-6">
                            Proceed to Checkout
                          </Button>
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href="/store">
                          <Button variant="outline" className="w-full mt-2">
                            Continue Shopping
                          </Button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.main>

      <Footer />
    </motion.div>
  );
}
