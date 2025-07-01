interface TestimonialCardProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

export function TestimonialCard({
  name,
  date,
  rating,
  comment,
}: TestimonialCardProps) {
  return (
    <div className="border rounded-lg p-6 bg-white">
      <div className="flex items-center mb-4">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              } fill-current`}
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          ))}
        </div>
      </div>
      <h3 className="font-bold text-lg mb-1">{name}</h3>
      <p className="text-gray-500 text-sm mb-4">{date}</p>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
}
