import Link from "next/link";
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-600/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-gray-200 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-6">
                <Mail className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  Stay Updated
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
                Never Miss a Delicious Deal
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Get exclusive access to new menu items, special discounts, and
                be the first to know about our amazing offers!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <div className="relative flex-1 w-full">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                  />
                </div>
                <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Y</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
                    YUMS
                  </span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Bringing you the authentic taste of West African cuisine with
                  modern convenience. Made with love, delivered with care.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-gray-900">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/store"
                      className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                      Browse Menu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/track"
                      className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-gray-900">
                  Support
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/faqs"
                      className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/returns"
                      className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                      Returns & Refunds
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500" />
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-gray-900">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Call us</p>
                      <p className="text-gray-900 font-medium">
                        +233 24 123 4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Email us</p>
                      <p className="text-gray-900 font-medium">
                        support@yums.store
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Visit us</p>
                      <p className="text-gray-900 font-medium">
                        123 University Road
                      </p>
                      <p className="text-gray-500 text-sm">Legon, Accra</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">We&apos;re open</p>
                      <p className="text-gray-900 font-medium">
                        Mon-Fri: 11AM-6:30PM
                      </p>
                      <p className="text-gray-500 text-sm">Sat: 9AM-5PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <p className="text-gray-500 text-sm">
                  © 2025 YUMS. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm">
                  <Link
                    href="/terms"
                    className="text-gray-500 hover:text-red-600 transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-gray-500 hover:text-red-600 transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/cookies"
                    className="text-gray-500 hover:text-red-600 transition-colors duration-300"
                  >
                    Cookie Policy
                  </Link>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm mr-2">We accept:</span>
                <div className="flex gap-2">
                  <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">V</span>
                  </div>
                  <div className="w-8 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <div className="w-8 h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <div className="w-8 h-6 bg-gradient-to-r from-green-600 to-green-700 rounded flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
