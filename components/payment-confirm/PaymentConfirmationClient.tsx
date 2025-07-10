"use client";
// import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  MapPin,
  ArrowRight,
  Printer,
  Home,
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Mail,
  Truck,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/helper";
// import { useCart } from "@/context/CartContext";

// Animation variants for order summary
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PaymentConfirmationClient = ({ orderDetails }: { orderDetails: any }) => {
  // Calculate estimated delivery time (paidAt + 40 minutes)

  // Helper function to determine if a step is completed based on order status
  const isStepCompleted = (step: string) => {
    const status = orderDetails.status;
    const orderType = orderDetails.orderType;

    if (orderType === "pickup") {
      switch (step) {
        case "confirmed":
          return (
            status === "pending" ||
            status === "preparing" ||
            status === "ready" ||
            status === "picked-up"
          );
        case "preparing":
          return (
            status === "preparing" ||
            status === "ready" ||
            status === "picked-up"
          );
        case "ready-for-pickup":
          return status === "ready" || status === "picked-up";
        case "picked-up":
          return status === "picked-up";
        default:
          return false;
      }
    } else {
      // Delivery order
      switch (step) {
        case "confirmed":
          return (
            status === "pending" ||
            status === "preparing" ||
            status === "ready" ||
            status === "on-the-way" ||
            status === "delivered"
          );
        case "preparing":
          return (
            status === "preparing" ||
            status === "ready" ||
            status === "on-the-way" ||
            status === "delivered"
          );
        case "on-the-way":
          return status === "on-the-way" || status === "delivered";
        case "delivered":
          return status === "delivered";
        default:
          return false;
      }
    }
  };

  // Get the appropriate progress steps based on order type
  const getProgressSteps = () => {
    const orderType = orderDetails.orderType;

    if (orderType === "pickup") {
      return [
        {
          id: "confirmed",
          title: "Order Confirmed",
          description: "Your order has been received",
        },
        {
          id: "preparing",
          title: "Preparing",
          description: "Your food is being prepared",
        },
        {
          id: "ready-for-pickup",
          title: "Ready for Pickup",
          description: "Your order is ready for pickup",
        },
        {
          id: "picked-up",
          title: "Picked Up",
          description: "Order completed!",
        },
      ];
    } else {
      return [
        {
          id: "confirmed",
          title: "Order Confirmed",
          description: "Your order has been received",
        },
        {
          id: "preparing",
          title: "Preparing",
          description: "Your food is being prepared",
        },
        {
          id: "on-the-way",
          title: "On the Way",
          description: "Your order is on its way to you",
        },
        {
          id: "delivered",
          title: "Delivered",
          description: "Enjoy your meal!",
        },
      ];
    }
  };

  // Delivery fee and total
  // const deliveryFee = "Pay at delivery";
  //   const total = cartTotal + deliveryFee
  return (
    <motion.div
      className="font-roboto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <main className="flex-1 py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-8 text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            <motion.h1
              className="text-2xl md:text-4xl font-bold mb-3 font-oswald"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Payment Successful!
            </motion.h1>
            <motion.p
              className="text-gray-600 mb-6 text-sm md:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Thank you for your order. Your payment has been processed
              successfully.
            </motion.p>
            <motion.div
              className="inline-block bg-gray-100 rounded-lg px-6 py-3 font-medium text-sm md:text-base border border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Order Number:{" "}
              <span className="text-red-500 font-bold">
                #{orderDetails.orderNumber}
              </span>
            </motion.div>
          </motion.div>

          {/* Customer Information */}
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold font-oswald">
                  Customer Information
                </h2>
                <p className="text-sm text-gray-500">Your order details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{orderDetails.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{orderDetails.customerPhone}</p>
                </div>
              </div>
              {orderDetails.customerEmail && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{orderDetails.customerEmail}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">
                    {new Date(orderDetails.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Details */}
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Truck className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold font-oswald">
                  Order Details
                </h2>
                <p className="text-sm text-gray-500">
                  Delivery and timing information
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Delivery Status */}
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base">
                    Estimated{" "}
                    {orderDetails.orderType === "pickup"
                      ? "Pickup"
                      : "Delivery"}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Today, {orderDetails.estimatedDelivery}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {orderDetails.orderType === "pickup"
                      ? "Please arrive on time to collect your order"
                      : "We'll notify you when your order is on the way"}
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                {orderDetails.orderType === "pickup" ? (
                  <div>
                    <h3 className="font-medium text-sm md:text-base">
                      Pickup Address
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      East Legon, Bawaleshie
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Please bring your order number for verification
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium text-sm md:text-base">
                      Delivery Address
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {orderDetails.deliveryAddress?.street}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Please ensure someone is available to receive the order
                    </p>
                  </div>
                )}
              </div>

              {/* Order Progress */}
              <div className="pt-4">
                <h3 className="font-medium mb-6 text-base md:text-lg">
                  Order Progress
                </h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-8">
                    {getProgressSteps().map((step, index) => (
                      <motion.div
                        key={step.id}
                        className="relative flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                      >
                        <div className="flex-shrink-0 mr-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center z-10 border-2 ${
                              isStepCompleted(step.id)
                                ? "bg-green-500 border-green-500"
                                : "bg-gray-100 border-gray-200"
                            }`}
                          >
                            {isStepCompleted(step.id) ? (
                              <CheckCircle className="h-6 w-6 text-white" />
                            ) : (
                              <div
                                className={`w-4 h-4 rounded-full ${
                                  index === 0 ? "bg-green-500" : "bg-gray-400"
                                }`}
                              ></div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4
                            className={`font-medium text-sm md:text-base ${
                              isStepCompleted(step.id)
                                ? "text-gray-900"
                                : "text-gray-500"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-500">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <Star className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold font-oswald">
                  Order Summary
                </h2>
                <p className="text-sm text-gray-500">
                  {orderDetails.items.length} items in your order
                </p>
              </div>
            </div>

            <motion.div
              className="space-y-4"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {orderDetails.items.map((item: any, index: number) => (
                  <motion.div
                    className="flex justify-between gap-x-4 lg:gap-x-10 pb-4 border-b border-gray-100 text-sm md:text-base w-full"
                    key={item.itemId}
                    variants={itemVariants}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <span className="truncate max-w-[60%]">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium min-w-[70px] text-right">
                      GH₵{item.total.toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                className="flex justify-between text-sm md:text-base"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.4 }}
              >
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  GH₵{formatCurrency(orderDetails.total)}
                </span>
              </motion.div>

              <motion.div
                className="flex justify-between text-sm md:text-base"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.5 }}
              >
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold text-green-600">
                  Pay on delivery
                </span>
              </motion.div>

              <motion.div
                className="border-t border-gray-200 pt-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.6 }}
              >
                <motion.div
                  className="flex justify-between font-bold text-base md:text-lg"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.7 }}
                >
                  <span>Total</span>
                  <span className="text-red-500">
                    GH₵{formatCurrency(orderDetails.total)}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <Link href="/track-order" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  Track Order <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button variant="outline" className="w-full">
                <Printer className="mr-2 h-4 w-4" /> Print Receipt
              </Button>
            </motion.div>
            <Link href="/" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" /> Back to Home
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default PaymentConfirmationClient;
