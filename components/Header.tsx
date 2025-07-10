"use client";

import Link from "next/link";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  Store,
  MapPin,
  Phone,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export function Header() {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 font-roboto">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
              <span className="text-white font-bold text-lg">Y</span>
            </div>
            <span className="text-xl font-bold text-gray-900">YUMS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/store"
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300"
            >
              <Store className="h-4 w-4" />
              Menu
            </Link>
            <Link
              href="/track"
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300"
            >
              <MapPin className="h-4 w-4" />
              Track Order
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300"
            >
              <Phone className="h-4 w-4" />
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/cart" className="relative group">
              <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            <Link href="/account" className="group">
              <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <User className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
              </div>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart" className="relative">
              <div className="p-2 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/store"
              className="flex items-center gap-3 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Store className="h-4 w-4" />
              Menu
            </Link>
            <Link
              href="/track"
              className="flex items-center gap-3 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MapPin className="h-4 w-4" />
              Track Order
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone className="h-4 w-4" />
              Contact
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-3 text-gray-600 hover:text-red-600 font-medium transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
