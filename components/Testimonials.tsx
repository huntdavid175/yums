"use client";

import React, { useState, useEffect } from "react";
import { Star, Users, Award, Heart, TrendingUp } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Maame",
      date: "November 10th, 2023",
      rating: 5,
      comment:
        "God bless you and your business wai. Didi jollof for Alpha Hour point of contact🙏🏿🙏🏿❤️❤️",
    },
    {
      name: "obed Moore",
      date: "November 11th, 2023",
      rating: 5,
      comment: "You guys dey force in this Nana Addo economy. Food is a 100",
    },
    {
      name: "magic mug☕",
      date: "November 12th, 2023",
      rating: 3,
      comment:
        "However, I was expecting more... The chicken is 10000/10 for me, the taste was very nice... If I should order again... Then it would be for the chicken and not jollof.",
    },
  ];
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-full px-3 py-1 mb-3">
            <Heart className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              Customer Love
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our amazing
            customers have to say about their YUMS experience.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-6 md:p-8 shadow-2xl text-center">
            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < testimonials[currentTestimonial].rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
              &quot;{testimonials[currentTestimonial].comment}&quot;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-500 text-xs">
                  {testimonials[currentTestimonial].date}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-2 mb-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? "bg-red-500 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              98%
            </div>
            <div className="text-gray-600 font-medium text-sm">
              Satisfaction Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              560K+
            </div>
            <div className="text-gray-600 font-medium text-sm">
              Happy Customers
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
              4.9
            </div>
            <div className="text-gray-600 font-medium text-sm">
              Average Rating
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
              <Award className="h-6 w-6 text-purple-500" />
              #1
            </div>
            <div className="text-gray-600 font-medium text-sm">In Ghana</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
