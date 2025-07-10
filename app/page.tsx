import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FoodCard } from "@/components/FoodCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden font-roboto">
        <Image
          src="https://www.tilda.com/wp-content/uploads/2024/08/Nigerian-Jollof-04-scaled.jpg"
          alt="Yums Hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        {/* Overlay gradient for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 z-20">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-full mb-6 shadow-lg animate-bounce">
            <span className="text-lg">🚚</span>
            <span className="font-semibold">Now delivering in 30 minutes!</span>
          </div>
          {/* Logo or badge */}
          <div className="mb-4">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Yums Badge"
              width={100}
              height={100}
              className="mx-auto rounded-full bg-white/20 p-2"
            />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 font-oswald drop-shadow-lg">
            <span className="text-red-500">YUMS</span> DELICACIES
          </h1>
          {/* Subtitle */}
          <p className="text-lg md:text-2xl mb-6 max-w-xl mx-auto text-white/90 font-roboto">
            Ghana’s favorite party trays, delivered hot and fresh to your door.
          </p>
          {/* CTA Button */}
          <Link
            href="/store"
            className="mt-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-orange-500 hover:to-red-600 text-white rounded-full px-8 py-3 font-bold text-lg shadow-xl transition-transform transform hover:scale-105 flex items-center gap-2"
          >
            Order here <span className="text-2xl">→</span>
          </Link>
        </div>
      </section>

      {/* Special Dishes Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-oswald">
              Our Special Dishes
            </h2>
            <div className="flex justify-center mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-6 h-6 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FoodCard
              id="Pork Ɛnumde"
              image="https://upload.wikimedia.org/wikipedia/commons/0/0a/Jollof_Rice_with_Stew.jpg"
              title="Pork Ɛnumde"
              price="160.00"
              category="Big Trays (Ɛnumde)"
              badge="Out of Stock"
            />
            <FoodCard
              image="https://africanchopbetter.com/wp-content/uploads/sites/110/2024/04/fried-rice-and-chicken.jpg"
              title="Easter Special (5 heads)"
              price="300.00"
              category="Big Trays (Ɛnumde)"
              id="Pork Ɛnumde"
            />
            <FoodCard
              image="https://preview.redd.it/7fajz6eccpb51.jpg?width=1080&crop=smart&auto=webp&s=40c39ff280b8f1bdf8e220cfb6ca3146f0e05511"
              title="Jollof John Cena"
              price="105.00"
              category="Combo"
              id="Pork Ɛnumde"
            />
            <FoodCard
              image="https://aftradvillagekitchen.co.uk/wp-content/uploads/2023/09/Waakye-in-leaf.png"
              title="Party Jollof for 15"
              price="800.00"
              category="Corporate Trays"
              id="Pork Ɛnumde"
            />
            <FoodCard
              image="https://i0.wp.com/biscuitsandladles.com/wp-content/uploads/2017/01/spaghetti1.jpg?fit=3082%2C2317&ssl=1"
              title="Birthday Jollof (for friends and family)"
              price="999.00"
              category="Big Trays (Ɛnumde)"
              id="Pork Ɛnumde"
            />
            <FoodCard
              image="https://static01.nyt.com/images/2021/03/10/dining/05Fufu1/05Fufu1-mediumSquareAt3X.jpg"
              title="Ramadan Special"
              price="GH₵150.00"
              category="Big Trays (Ɛnumde)"
              id="Pork Ɛnumde"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section  */}
      <CTA />

      <Footer />
    </div>
  );
}
