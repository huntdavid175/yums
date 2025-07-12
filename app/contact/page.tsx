"use client";

import type React from "react";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  Twitter,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-16 px-4 bg-gray-50 font-roboto">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                We&apos;re online and ready to help!
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 font-oswald">
              Let&apos;s Talk
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-oswald">
              Got questions about our mouth-watering food? Need help with an
              order?
              <br />
              <span className="text-red-600 font-semibold ">
                We&apos;re here to make your experience amazing.
              </span>
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold mb-6 text-gray-900 font-oswald">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-600">+233 24 123 4567</p>
                      <p className="text-gray-600">+233 20 987 6543</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <p className="text-gray-600">support@yums.store</p>
                      <p className="text-gray-600">orders@yums.store</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Location
                      </h3>
                      <p className="text-gray-600">123 University Road</p>
                      <p className="text-gray-600">Legon, Accra, Ghana</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 font-oswald">
                    Business Hours
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold text-sm text-red-600">
                      11:00 AM - 6:30 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold text-sm text-red-600">
                      9:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-gray-500 text-sm">
                      Closed
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-50 rounded-xl">
                  <p className="text-sm text-red-600 font-medium">
                    💡 Pro Tip: Order before 5:00 PM for same-day delivery!
                  </p>
                </div>
              </div>

              {/* Follow Us */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-xl font-bold mb-6 text-gray-900 font-oswald">
                  Follow Us
                </h2>
                <div className="flex gap-4 mb-4">
                  <a
                    href="https://instagram.com"
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://twitter.com"
                    className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
                <p className="text-sm text-gray-600">
                  Follow us for daily food updates, special offers, and
                  behind-the-scenes content!
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-oswald">
                    Send us a Message
                  </h2>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for reaching out. We&apos;ll get back to you
                      within 24 hours.
                    </p>
                    <p className="text-sm text-gray-500">
                      This form will reset automatically...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="mt-1 h-12 border-gray-300 focus:border-red-600 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                          className="mt-1 h-12 border-gray-300 focus:border-red-600 focus:ring-red-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+233 XX XXX XXXX"
                          className="mt-1 h-12 border-gray-300 focus:border-red-600 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="subject"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Subject *
                        </Label>
                        <Select
                          value={formData.subject}
                          onValueChange={handleSubjectChange}
                          required
                        >
                          <SelectTrigger className="mt-1 h-12 border-gray-300 focus:border-red-600 focus:ring-red-600">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="order">Order Support</SelectItem>
                            <SelectItem value="catering">
                              Catering Services
                            </SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="partnership">
                              Partnership
                            </SelectItem>
                            <SelectItem value="complaint">Complaint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        required
                        className="mt-1 resize-none border-gray-300 focus:border-red-600 focus:ring-red-600"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 h-12"
                    >
                      {isSubmitting ? (
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
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      We typically respond within 24 hours. For urgent matters,
                      please call us directly.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-16">
            <div className="p-8 pb-0">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 font-oswald">
                Find Us
              </h2>
              <p className="text-gray-600 mb-6">
                Visit our location at Legon Campus. We&apos;re easily accessible
                and offer both pickup and delivery services.
              </p>
            </div>
            <div className="h-[400px] bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">
                    Google Maps integration would be here
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center font-oswald">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 font-oswald">
                  What are your delivery areas?
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  We currently deliver within Legon, East Legon, Madina, and
                  surrounding areas. Delivery fee may vary based on location.
                </p>

                <h3 className="font-semibold text-gray-900 mb-2 font-oswald">
                  How long does delivery take?
                </h3>
                <p className="text-gray-600 text-sm">
                  Standard delivery takes 40-60 minutes. Express delivery (where
                  available) takes 20-30 minutes for an additional fee.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 font-oswald">
                  Do you cater for events?
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Yes! We offer catering services for events, parties, and
                  corporate functions. Contact us for custom packages and
                  pricing.
                </p>

                <h3 className="font-semibold text-gray-900 mb-2 font-oswald">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 text-sm">
                  We accept cash on delivery, mobile money (MTN, Vodafone), and
                  bank transfers. Online payment options coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
