import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  reviewsCount?: number;
}

function StarRating({ rating, reviewsCount }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      <span className="star-rating-icons">
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}

        {hasHalfStar && <FaStarHalfAlt />}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </span>

      <span className="star-rating-value">{rating.toFixed(1)}</span>

      {reviewsCount !== undefined && (
        <span className="star-rating-count">({reviewsCount} reviews)</span>
      )}
    </div>
  );
}

export default StarRating;
