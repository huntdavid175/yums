"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  MapPin,
  ArrowRight,
  Printer,
  Home,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const PaymentConfirmationClient = ({ orderDetails }: { orderDetails: any }) => {
  // Calculate estimated delivery time (paidAt + 40 minutes)

  // Helper function to determine if a step is completed based on order status
  const isStepCompleted = (step: string) => {
    const status = orderDetails.status;
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
  };

  // Delivery fee and total
  const deliveryFee = "Pay at delivery";
  //   const total = cartTotal + deliveryFee
  return (
    <div>
      <main className="flex-1 py-8 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-8 text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. Your payment has been processed
              successfully.
            </p>
            <div className="inline-block bg-gray-100 rounded-lg px-4 py-2 font-medium">
              Order Number:{" "}
              <span className="text-[#FF6B00]">{orderDetails.id}</span>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Order Details</h2>

            <div className="space-y-6">
              {/* Delivery Status */}
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Estimated Delivery</h3>
                  <p className="text-gray-600">
                    Today, {orderDetails.estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Delivery Address</h3>
                  <p className="text-gray-600">
                    {orderDetails.deliveryAddress?.street}
                  </p>
                </div>
              </div>

              {/* Order Progress */}
              <div className="pt-4">
                <h3 className="font-medium mb-4">Order Progress</h3>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-8">
                    <div className="relative flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                            isStepCompleted("confirmed")
                              ? "bg-[#FF6B00]"
                              : "bg-gray-200"
                          }`}
                        >
                          <CheckCircle
                            className={`h-5 w-5 ${
                              isStepCompleted("confirmed")
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <h4
                          className={`font-medium ${
                            isStepCompleted("confirmed")
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          Order Confirmed
                        </h4>
                        <p className="text-sm text-gray-500">
                          Your order has been received
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                            isStepCompleted("preparing")
                              ? "bg-[#FF6B00]"
                              : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              isStepCompleted("preparing")
                                ? "bg-white"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <h4
                          className={`font-medium ${
                            isStepCompleted("preparing")
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          Preparing
                        </h4>
                        <p className="text-sm text-gray-500">
                          Your food is being prepared
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                            isStepCompleted("on-the-way")
                              ? "bg-[#FF6B00]"
                              : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              isStepCompleted("on-the-way")
                                ? "bg-white"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <h4
                          className={`font-medium ${
                            isStepCompleted("on-the-way")
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          On the Way
                        </h4>
                        <p className="text-sm text-gray-500">
                          Your order is on its way to you
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                            isStepCompleted("delivered")
                              ? "bg-[#FF6B00]"
                              : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              isStepCompleted("delivered")
                                ? "bg-white"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <h4
                          className={`font-medium ${
                            isStepCompleted("delivered")
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          Delivered
                        </h4>
                        <p className="text-sm text-gray-500">
                          Enjoy your meal!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4">
              {orderDetails.items.map((item: any) => (
                <div
                  className="flex justify-between pb-4 border-b border-gray-100"
                  key={item.itemId}
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    GH₵{item.total.toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  GH₵{orderDetails.total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">Pay on delivery</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-[#FF6B00]">
                    GH₵{orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/track-order" className="flex-1">
              <Button className="w-full bg-[#FF6B00] hover:bg-[#e05f00] text-white">
                Track Order <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="flex-1">
              <Printer className="mr-2 h-4 w-4" /> Print Receipt
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmationClient;
