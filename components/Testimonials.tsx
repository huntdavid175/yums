"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Users,
  Award,
  Heart,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  });

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
    {
      name: "Kwame",
      date: "November 13th, 2023",
      rating: 4,
      comment: "Great food, quick delivery. Will order again!",
    },
    {
      name: "Ama",
      date: "November 14th, 2023",
      rating: 5,
      comment: "Absolutely delicious! My family loved it.",
    },
  ];

  // Responsive: 1 on mobile, 2 on md+
  const testimonialsPerPage = windowWidth >= 768 ? 2 : 1;
  const maxIndex = testimonials.length - testimonialsPerPage;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  // Slice the testimonials to show
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + testimonialsPerPage
  );
  // If at the end, wrap around
  if (visibleTestimonials.length < testimonialsPerPage) {
    visibleTestimonials.push(
      ...testimonials.slice(0, testimonialsPerPage - visibleTestimonials.length)
    );
  }

  return (
    <section className="py-16 px-4 relative overflow-hidden font-roboto">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-full px-3 py-1 mb-3">
            <Heart className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              Customer Love
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent font-oswald">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our amazing
            customers have to say about their YUMS experience.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonials"
            className="p-2 rounded-full bg-white border border-gray-200 shadow hover:bg-red-50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-red-600" />
          </button>
          <div className="flex-1 max-w-3xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-6`}
              >
                {visibleTestimonials.map((t) => (
                  <div
                    key={t.name + t.date}
                    className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-6 md:p-8 shadow-2xl text-center flex flex-col justify-between min-h-[320px] transition-all duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < t.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                      &quot;{t.comment}&quot;
                    </blockquote>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {t.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 text-sm">
                          {t.name}
                        </div>
                        <div className="text-gray-500 text-xs">{t.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={handleNext}
            aria-label="Next testimonials"
            className="p-2 rounded-full bg-white border border-gray-200 shadow hover:bg-red-50 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-red-600" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: testimonials.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-red-500 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-roboto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2 font-oswald">
              <TrendingUp className="h-6 w-6 text-green-500" />
              98%
            </div>
            <div className="text-gray-600 font-medium text-sm">
              Satisfaction Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2 font-oswald">
              <Users className="h-6 w-6 text-blue-500" />
              560K+
            </div>
            <div className="text-gray-600 font-medium text-sm">
              Happy Customers
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2 font-oswald">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
              4.9
            </div>
            <div className="text-gray-600 font-medium text-sm">
              Average Rating
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2 font-oswald">
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
