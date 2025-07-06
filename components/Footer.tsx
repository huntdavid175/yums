import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">YUMS</h3>
            <p className="text-gray-600 mb-4">
              We are available 24/7 at{" "}
              <a href="mailto:support@yums.store" className="text-[#FF6B00]">
                support@yums.store
              </a>
            </p>
            <p className="text-gray-600">
              If you&apos;re interested in collaborating with us or becoming an
              affiliate, shoot us a message on Instagram. Let&apos;s create
              something amazing together!
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faqs"
                  className="text-gray-600 hover:text-[#FF6B00]"
                >
                  • FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-600 hover:text-[#FF6B00]"
                >
                  • Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href="/return-refund"
                  className="text-gray-600 hover:text-[#FF6B00]"
                >
                  • Return & Refund
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-[#FF6B00]"
                >
                  • Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Working Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-gray-600">
                  <span className="text-[#FF6B00] font-medium">Mon-Fri:</span>{" "}
                  11am-6:30pm
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-gray-600">
                  <span className="text-[#FF6B00] font-medium">Sat:</span>{" "}
                  9am-5pm
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe.</h3>
            <p className="text-gray-600 mb-4">
              COMING SOON! Sign up for 10% OFF your first order. Plus, get
              exclusive early access to amazing sales, special discounts, and
              the chance to win a free T-Shirt!
            </p>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Follow Us On:</h4>
              <div className="flex gap-4">
                <Link
                  href="https://instagram.com"
                  className="text-gray-600 hover:text-[#FF6B00]"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-gray-600 hover:text-[#FF6B00]"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              © 2025 YUMS. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <div className="bg-gray-100 rounded h-[25px] w-[40px]"></div>
              <div className="bg-gray-100 rounded h-[25px] w-[40px]"></div>
              <div className="bg-gray-100 rounded h-[25px] w-[40px]"></div>
              <div className="bg-gray-100 rounded h-[25px] w-[40px]"></div>
              <div className="bg-gray-100 rounded h-[25px] w-[40px]"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
