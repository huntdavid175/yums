"use client";

import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Truck, CreditCard, User, Mail } from "lucide-react";
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
    const address =
      selectedLocation?.address || addressRef.current?.value || "";

    // Validate required fields
    const errors = {
      address: deliveryMethod === "delivery" && !address,
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

      // Add location data if available
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
    if (addressRef.current) {
      addressRef.current.value = location.address;
    }
  };

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
            Checkout
          </motion.h1>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {/* Checkout Form */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {/* Delivery Options */}
              <motion.div
                className="bg-white rounded-xl shadow-sm overflow-hidden p-6"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <h2 className="text-base md:text-lg font-semibold mb-4">
                  Delivery Options
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      deliveryMethod === "delivery"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setDeliveryMethod("delivery")}
                  >
                    <Truck className="h-6 w-6 md:h-8 md:w-8 text-red-500 mb-2" />
                    <span className="font-medium text-sm md:text-base">
                      Delivery
                    </span>
                  </div>
                  <div
                    className={`border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      deliveryMethod === "pickup"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setDeliveryMethod("pickup")}
                  >
                    <MapPin className=" h-6 w-6 md:h-8 md:w-8 text-red-500 mb-2" />
                    <span className="font-medium text-sm md:text-base">
                      Pickup
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Personal Information */}
              <motion.div
                className="bg-white rounded-xl shadow-sm overflow-hidden p-6"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <h2 className="text-lg md:text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10 "
                        ref={fullNameRef}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="mt-1 flex">
                      <div className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <div className="flex items-center gap-x-1">
                          {/* <Image
                            src="/placeholder.svg?height=20&width=30"
                            alt="Ghana flag"
                            width={20}
                            height={15}
                            className="mr-1"
                          /> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
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
                        className={`rounded-l-none ${
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
                  <Label htmlFor="email">Email Address</Label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-10"
                      required
                      ref={emailRef}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Delivery Address */}
              {deliveryMethod === "delivery" && (
                <motion.div
                  className="bg-white rounded-xl shadow-sm overflow-hidden p-6"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <h2 className="text-lg md:text-xl font-semibold mb-4">
                    Delivery Address
                  </h2>

                  {/* Google Maps with Autocomplete */}
                  <GoogleMapsAutocomplete
                    onLocationSelect={handleLocationSelect}
                    placeholder="Please select your location"
                    className="rounded-lg overflow-hidden border border-gray-200"
                    mapHeight="300px"
                    hasError={formErrors.address}
                    errorMessage="Please select a complete address"
                    value={selectedLocation?.address || ""}
                    onChange={(value) => {
                      // Update the addressRef for form validation
                      if (addressRef.current) {
                        addressRef.current.value = value;
                      }
                      // Clear error when user starts typing
                      if (value && formErrors.address) {
                        setFormErrors((prev) => ({ ...prev, address: false }));
                      }
                    }}
                  />
                </motion.div>
              )}

              {/* Delivery Speed */}
              {deliveryMethod === "delivery" && (
                <motion.div
                  className="bg-white rounded-xl shadow-sm overflow-hidden p-6"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <h2 className="text-lg md:text-xl font-semibold mb-4">
                    Delivery Speed
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`border rounded-lg p-4 cursor-not-allowed transition-colors opacity-50 ${
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

                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        deliverySpeed === "standard"
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setDeliverySpeed("standard")}
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
                          <p className="text-xs md:textsm text-gray-500">
                            40-60 min
                          </p>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            Pay delivery fee on arrival
                          </p>
                        </div>
                      </div>
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
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-sm overflow-hidden p-6 sticky top-24"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <h2 className="text-base md:text-lg font-semibold mb-6">
                  Order Breakdown
                </h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-x-6 pb-4 border-b border-gray-100 text-xs lg:text-sm "
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium min-w-[70px] text-right">
                        GH₵
                        {formatCurrency(
                          Number.parseFloat(item.price.replace(/[^\d.]/g, "")) *
                            item.quantity
                        )}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between text-xs md:text-sm ">
                    <span className="text-gray-600">
                      Estimated Delivery Fee
                    </span>
                    {deliveryMethod === "pickup" ? (
                      <span className="font-medium">Free</span>
                    ) : (
                      <span className="font-medium">Pay on arrival</span>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-sm md:text-base">
                      <span>Subtotal</span>
                      <span className="text-red-500">
                        GH₵{formatCurrency(total)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-red-500 hover:bg-red-500 text-white mt-6"
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
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </motion.div>
  );
}
