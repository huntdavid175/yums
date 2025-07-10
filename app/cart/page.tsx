"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Clock,
} from "lucide-react";
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
        className="flex-1 py-8 px-4 font-roboto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Link href="/store">
                <motion.div
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </motion.div>
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-oswald">Your Cart</h1>
                <p className="text-gray-600 text-sm">
                  Review and checkout your items
                </p>
              </div>
            </div>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-medium mb-2 font-oswald">
                  Your cart is empty
                </h2>
                <p className="text-gray-500">
                  Looks like you haven&apos;t added any items to your cart yet.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/store">
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    Start Shopping
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
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <div className="p-6">
                    <motion.div
                      className="flex items-center gap-3 mb-6"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <div className="p-2 bg-red-100 rounded-lg">
                        <ShoppingBag className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-semibold font-oswald">
                          Cart Items ({cartItems.length})
                        </h2>
                        <p className="text-sm text-gray-500">
                          Review your selections
                        </p>
                      </div>
                    </motion.div>

                    <div className="divide-y divide-gray-100">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="py-6 flex flex-col sm:flex-row gap-4 group"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.7 + index * 0.05,
                          }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <motion.div
                            className="flex-shrink-0 relative w-[100px] h-[100px]"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="rounded-lg object-cover border border-gray-200 w-full h-full"
                            />
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs md:text-sm px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-bold">
                              {item.quantity}
                            </div>
                          </motion.div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-sm md:text-base group-hover:text-red-600 transition-colors">
                                  {item.name}
                                </h3>
                                <p className="text-xs text-gray-500 mb-1">
                                  {item.category}
                                </p>
                              </div>
                              <motion.button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label="Remove item"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
                            </div>

                            <p className="text-red-500 font-bold text-sm md:text-base mb-4">
                              {item.price}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="p-2 rounded-full border border-gray-300 hover:border-red-300 hover:bg-red-50 transition-colors"
                                  aria-label="Decrease quantity"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus className="h-4 w-4" />
                                </motion.button>

                                <div className="w-12 text-center font-medium text-sm">
                                  {item.quantity}
                                </div>

                                <motion.button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="p-2 rounded-full border border-gray-300 hover:border-red-300 hover:bg-red-50 transition-colors"
                                  aria-label="Increase quantity"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus className="h-4 w-4" />
                                </motion.button>
                              </div>
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
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 sticky top-20"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <div className="p-6">
                    <motion.h2
                      className="text-lg md:text-xl font-semibold mb-4 font-oswald"
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
                          className="flex justify-between font-bold text-lg"
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

                      {/* Delivery Info */}
                      <motion.div
                        className="bg-gray-50 rounded-lg p-4 mt-4"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1.3 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Truck className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Free Delivery
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-xs text-gray-500">
                            Estimated delivery: 30-45 minutes
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href="/checkout" className="w-full">
                          <Button className="w-full bg-red-500 hover:bg-red-600 text-white mt-4">
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
