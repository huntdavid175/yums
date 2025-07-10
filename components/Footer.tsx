"use client";
import Link from "next/link";
import { Instagram, Twitter, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 font-roboto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Contact */}
          <div>
            <h2 className="text-xl font-bold mb-3 font-oswald">Didi Jollof</h2>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-gray-700" />
              <span className="text-sm">
                We are available 24/7 at{" "}
                <a
                  href="mailto:support@didijollof.store"
                  className="text-red-600 hover:underline"
                >
                  support@yums.store
                </a>
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              If you&apos;re interested in collaborating with us or becoming an
              affiliate, shoot us a message on Instagram. Let&apos;s create
              something amazing together!
            </p>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-base font-bold mb-3 font-oswald">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-red-600 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  className="hover:text-red-600 transition-colors"
                >
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-red-600 transition-colors"
                >
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-red-600 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-base font-bold mb-3 font-oswald">
              Working Hours
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-gray-700" />
              <span className="font-semibold text-red-600">Mon-Fri:</span>
              <span className="text-gray-700">11am-6:30pm</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-700" />
              <span className="font-semibold text-red-600">Sat:</span>
              <span className="text-gray-700">9am-5pm</span>
            </div>
          </div>

          {/* Subscribe & Social */}
          <div>
            <h3 className="text-base font-bold mb-3 font-oswald">Subscribe.</h3>
            <p className="text-gray-600 text-sm mb-4">
              COMING SOON! Sign up for 10% OFF your first order. Plus, get
              exclusive early access to amazing sales, special discounts, and
              the chance to win a free T-Shirt!
            </p>
            <div>
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                Follow Us On:
              </span>
              <div className="flex gap-3 mt-1">
                <a
                  href="https://instagram.com"
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4 text-gray-700" />
                </a>
                <a
                  href="https://twitter.com"
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4 text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Yums. All Rights Reserved.
          </p>
          {/* <div className="flex gap-3">
            <img src="/visa.svg" alt="Visa" className="h-7" />
            <img src="/mastercard.svg" alt="MasterCard" className="h-7" />
            <img src="/applepay.svg" alt="Apple Pay" className="h-7" />
            <img src="/googlepay.svg" alt="Google Pay" className="h-7" />
            <img src="/stripe.svg" alt="Stripe" className="h-7" />
          </div> */}
        </div>
      </div>
    </footer>
  );
}
