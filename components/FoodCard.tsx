"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface FoodCardProps {
  image: string;
  title: string;
  price: string;
  category: string;
  badge?: string;
  id: string;
  index?: number;
}

export function FoodCard({
  image,
  title,
  price,
  category,
  badge,
  id,
  index = 0,
}: FoodCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
    >
      <Link href={`/product/${id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full group cursor-pointer">
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <motion.div
              className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {category}
            </motion.div>
            {badge && (
              <motion.div
                className="absolute top-3 right-[-30px] bg-red-500 text-white text-xs px-4 py-1 transform rotate-45"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {badge}
              </motion.div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-sm md:text-base mb-2 group-hover:text-red-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-red-500 font-bold text-xs md:text-sm group-hover:text-red-700 transition-colors duration-300">
              GH₵{price}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
