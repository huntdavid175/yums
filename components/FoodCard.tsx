import Image from "next/image";
import Link from "next/link";

interface FoodCardProps {
  image: string;
  title: string;
  price: string;
  category: string;
  badge?: string;
  id: string;
}

export function FoodCard({
  image,
  title,
  price,
  category,
  badge,
  id,
}: FoodCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
          <div className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
            {category}
          </div>
          {badge && (
            <div className="absolute top-3 right-[-30px] bg-red-500 text-white text-xs px-4 py-1 transform rotate-45">
              {badge}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg mb-2">{title}</h3>
          <p className="text-[#FF6B00] font-bold">GH₵{price}</p>
        </div>
      </div>
    </Link>
  );
}
