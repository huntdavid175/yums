import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white relative overflow- font-roboto">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 font-oswald">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Ready to Experience
          <br />
          <span className="text-red-200">Authentic Jollof?</span>
        </h2>
        <p className="text-base md:text-lg mb-6 text-red-100 leading-relaxed font-roboto">
          Join thousands of satisfied customers who have made YUMS their go-to
          choice for authentic West African cuisine.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/store">
            <Button className="bg-white text-red-600 hover:bg-red-50 px-6 py-3 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold font-roboto">
              Order Now - 30min Delivery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="border-2 border-white/50 text-white hover:bg-white/10 px-6 py-3 text-base rounded-full backdrop-blur-sm transition-all duration-300 bg-transparent font-roboto"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
