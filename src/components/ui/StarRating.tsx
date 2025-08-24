import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
}) => {
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={i}
            size={16}
            className={`
              ${starValue <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              ${starValue > rating && starValue - 1 < rating ? "fill-yellow-400 text-yellow-400 opacity-50" : ""} // For half stars
            `}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
