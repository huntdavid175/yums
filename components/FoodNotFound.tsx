"use client";

import Link from "next/link";
import { ChefHat, ArrowLeft, Store, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FoodNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-4">
            <ChefHat className="h-12 w-12 text-[#FF6B00]" />
          </div>
          <div className="text-6xl mb-2">🍽️</div>
        </div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Dish Not Found
        </h1>
        <p className="text-gray-600 mb-2 leading-relaxed">
          We couldn't find the delicious meal you're looking for. It might have
          been removed from our menu or the link might be incorrect.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Don't worry, we have plenty of other amazing dishes waiting for you!
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/store" className="block">
            <Button className="w-full bg-[#FF6B00] hover:bg-[#e05f00] text-white">
              <Store className="mr-2 h-4 w-4" />
              Browse Our Menu
            </Button>
          </Link>

          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Looking for something specific?
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Try searching for "jollof", "chicken", or browse our categories to
            find your perfect meal.
          </p>
        </div>

        {/* Popular Items */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Items You Might Like
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/product/chicken-enumde-original"
              className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-[#FF6B00] hover:bg-orange-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                🍗
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  Chicken Enumde Original
                </div>
                <div className="text-sm text-[#FF6B00] font-bold">
                  GH₵150.00
                </div>
              </div>
            </Link>

            <Link
              href="/product/jollof-john-cena"
              className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-[#FF6B00] hover:bg-orange-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                🍚
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  Jollof John Cena
                </div>
                <div className="text-sm text-[#FF6B00] font-bold">
                  GH₵105.00
                </div>
              </div>
            </Link>

            <Link
              href="/product/easter-special"
              className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-[#FF6B00] hover:bg-orange-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                🎉
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Easter Special</div>
                <div className="text-sm text-[#FF6B00] font-bold">
                  GH₵300.00
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
