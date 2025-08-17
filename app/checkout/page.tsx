"use client";

import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Truck,
  CreditCard,
  User,
  Mail,
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrder } from "../actions/place-order";
import { formatCurrency } from "@/helpers/helper";
import { motion } from "framer-motion";
import GoogleMapsAutocomplete from "@/components/ui/GoogleMapsAutocomplete";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [paystackHandler, setPaystackHandler] = useState<any>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express">(
    "standard"
  );
  const [formErrors, setFormErrors] = useState({
    address: false,
    phone: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [currentAddress, setCurrentAddress] = useState("");

  // Refs for form fields
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  // Delivery fee based on selected speed
  const deliveryFee =
    deliveryMethod === "pickup" ? 0 : deliverySpeed === "express" ? 50 : 0;
  const total = cartTotal + deliveryFee;

  const handlePayNow = async () => {
    setIsProcessing(true);

    // Get form values
    const customerName = fullNameRef.current?.value || "";
    const customerPhone = phoneRef.current?.value || "";
    const customerEmail = emailRef.current?.value || "";
    const address = currentAddress || selectedLocation?.address || "";

    // Debug logging
    console.log("Address validation:", {
      currentAddress,
      selectedLocationAddress: selectedLocation?.address,
      finalAddress: address,
      deliveryMethod,
      hasError: deliveryMethod === "delivery" && !address.trim(),
    });

    // Validate required fields
    const errors = {
      address: deliveryMethod === "delivery" && !address.trim(),
      phone: !customerPhone,
    };
    setFormErrors(errors);
    if (errors.address || errors.phone) {
      setIsProcessing(false);
      return;
    }

    // Build delivery information object
    const deliveryInformation: any = {
      customerName,
      customerPhone,
      customerEmail,
      orderType: deliveryMethod, // "delivery" or "pickup"
      paymentMethod: "card", // or get from form if you have multiple options
    };
    if (deliveryMethod === "delivery") {
      deliveryInformation.deliveryAddress = {
        street: address,
        city: "", // You can add city/zip fields if you have them
        zip: "",
      };

      // Add location data if available (from autocomplete)
      if (selectedLocation) {
        deliveryInformation.location = {
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          address: selectedLocation.address,
        };
      }
    }

    // Create the order in Firestore (backend-calculated prices)
    const order = await createOrder(cartItems, deliveryInformation);

    if (order) {
      const payment = await paystackHandler.resumeTransaction(
        order.payment.data.access_code,
        {
          onSuccess: () => {
            clearCart();
            router.replace(`/payment-success/${order.order.orderId}`);
          },
        }
      );
    }

    // Simulate payment processing or redirect to success page
    // setTimeout(() => {
    //   setIsProcessing(false);
    //   router.push("/payment-success");
    // }, 1500);
  };

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setSelectedLocation(location);
    setCurrentAddress(location.address);
    if (addressRef.current) {
      addressRef.current.value = location.address;
    }
  };

  // Sync addressRef with selectedLocation
  useEffect(() => {
    if (selectedLocation?.address && addressRef.current) {
      addressRef.current.value = selectedLocation.address;
      setCurrentAddress(selectedLocation.address);
    }
  }, [selectedLocation]);

  useEffect(() => {
    // Dynamically import PaystackPop only on the client side
    import("@paystack/inline-js").then((module) => {
      const PaystackPop = module.default;
      const handler = new PaystackPop();
      setPaystackHandler(handler);
    });
  }, []);

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
              <Link href="/cart">
                <motion.div
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </motion.div>
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-oswald">Checkout</h1>
                <p className="text-gray-600 text-sm">Complete your order</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {/* Checkout Form */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {/* Delivery Options */}
              <motion.div
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Truck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold font-oswald">
                        Delivery Options
                      </h2>
                      <p className="text-sm text-gray-500">
                        Choose how you&apos;d like to receive your order
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className={`border-2 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        deliveryMethod === "delivery"
                          ? "border-red-500 bg-red-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                      onClick={() => setDeliveryMethod("delivery")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Truck className="h-6 w-6 md:h-8 md:w-8 text-red-500 mb-3" />
                      <span className="font-medium text-sm md:text-base text-center">
                        Delivery
                      </span>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        We&apos;ll bring it to you
                      </p>
                    </motion.div>
                    <motion.div
                      className={`border-2 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        deliveryMethod === "pickup"
                          ? "border-red-500 bg-red-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                      onClick={() => setDeliveryMethod("pickup")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MapPin className="h-6 w-6 md:h-8 md:w-8 text-red-500 mb-3" />
                      <span className="font-medium text-sm md:text-base text-center">
                        Pickup
                      </span>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Collect from our store
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Personal Information */}
              <motion.div
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold font-oswald">
                        Personal Information
                      </h2>
                      <p className="text-sm text-gray-500">
                        Tell us how to reach you
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <div className="mt-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                          ref={fullNameRef}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <div className="mt-2 flex">
                        <div className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          <div className="flex items-center gap-x-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 64 64"
                            >
                              <path fill="#f9cb38" d="M0 25h64v14H0z" />
                              <path
                                fill="#ec1c24"
                                d="M54 10H10C3.373 10 0 14.925 0 21v4h64v-4c0-6.075-3.373-11-10-11"
                              />
                              <path
                                fill="#137a08"
                                d="M0 43c0 6.075 3.373 11 10 11h44c6.627 0 10-4.925 10-11v-4H0v4"
                              />
                              <path
                                fill="#25333a"
                                d="m31.778 25.825l1.947 3.945l4.355.638l-3.149 3.072l.744 4.333l-3.897-2.047l-3.896 2.047l.744-4.333l-3.15-3.072l4.356-.638z"
                              />
                            </svg>
                            <span>+233</span>
                          </div>
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          className={`rounded-l-none border-gray-300 focus:border-red-500 focus:ring-red-500 ${
                            formErrors.phone ? "border-red-500" : ""
                          }`}
                          placeholder="Phone number"
                          required
                          ref={phoneRef}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          Please enter a valid phone number.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="mt-2 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                        required
                        ref={emailRef}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Delivery Address */}
              {deliveryMethod === "delivery" && (
                <motion.div
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-semibold font-oswald">
                          Delivery Address
                        </h2>
                        <p className="text-sm text-gray-500">
                          Where should we deliver your order?
                        </p>
                      </div>
                    </div>

                    {/* Google Maps with Autocomplete */}
                    <GoogleMapsAutocomplete
                      onLocationSelect={handleLocationSelect}
                      placeholder="Please enter your location"
                      className="rounded-lg overflow-hidden border border-gray-200"
                      mapHeight="300px"
                      hasError={formErrors.address}
                      errorMessage="Please select a complete address"
                      value={selectedLocation?.address || ""}
                      onChange={(value) => {
                        // Update the currentAddress state for form validation
                        setCurrentAddress(value);
                        // Always update the addressRef for form validation
                        if (addressRef.current) {
                          addressRef.current.value = value;
                        }
                        // Clear error when user types anything meaningful
                        if (value.trim() && formErrors.address) {
                          setFormErrors((prev) => ({
                            ...prev,
                            address: false,
                          }));
                        }
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Delivery Speed */}
              {deliveryMethod === "delivery" && (
                <motion.div
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-semibold font-oswald">
                          Delivery Speed
                        </h2>
                        <p className="text-sm text-gray-500">
                          Choose your preferred delivery time
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`border-2 rounded-lg p-4 cursor-not-allowed transition-colors opacity-50 ${
                          deliverySpeed === "express"
                            ? "border-gray-300 bg-gray-100"
                            : "border-gray-200 bg-gray-50"
                        }`}
                        onClick={() => {
                          // Disable express delivery for now
                          // setDeliverySpeed("express")
                        }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm md:text-base text-gray-500">
                              Express Delivery
                            </h3>
                            <p className="text-xs md:text-sm text-gray-400">
                              20-30 min
                            </p>
                            <p className="text-xs md:text-sm text-red-500 mt-1 font-medium">
                              Currently Unavailable
                            </p>
                            <p className="text-gray-400 font-medium mt-2 text-sm md:text-base">
                              GH₵50.00
                            </p>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          deliverySpeed === "standard"
                            ? "border-red-500 bg-red-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                        }`}
                        onClick={() => setDeliverySpeed("standard")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            <svg
                              className="w-6 h-6 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="10" strokeWidth={2} />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6l4 2"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm md:text-base">
                              Standard Delivery
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500">
                              40-60 min
                            </p>
                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                              Pay delivery fee on arrival
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 sticky top-24"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold font-oswald">
                        Order Summary
                      </h2>
                      <p className="text-sm text-gray-500">
                        {cartItems.length} items in your order
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="flex justify-between gap-x-6 pb-4 border-b border-gray-100 text-xs lg:text-sm"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.8 + index * 0.05,
                        }}
                      >
                        <span className="flex-1">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium min-w-[70px] text-right">
                          GH₵
                          {formatCurrency(
                            Number.parseFloat(
                              item.price.replace(/[^\d.]/g, "")
                            ) * item.quantity
                          )}
                        </span>
                      </motion.div>
                    ))}

                    <motion.div
                      className="flex justify-between text-xs md:text-sm"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 1.0 }}
                    >
                      <span className="text-gray-600">
                        Estimated Delivery Fee
                      </span>
                      {deliveryMethod === "pickup" ? (
                        <span className="font-medium text-green-600">Free</span>
                      ) : (
                        <span className="font-medium">Pay on arrival</span>
                      )}
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

                    {/* Security Badge */}
                    <motion.div
                      className="bg-green-50 rounded-lg p-4 mt-4"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1.3 }}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-700 font-medium">
                          Secure Payment
                        </span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        Your payment information is encrypted and secure
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full bg-red-500 hover:bg-red-600 text-white mt-4"
                        onClick={handlePayNow}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" /> Pay Now
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <p className="text-xs md:text-sm text-gray-500 text-center mt-4">
                      By completing this purchase, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-red-500 hover:underline"
                      >
                        terms of service
                      </Link>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </motion.div>
  );
}
