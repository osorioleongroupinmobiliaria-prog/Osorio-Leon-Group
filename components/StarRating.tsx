
import React from 'react';
import StarIcon from './icons/StarIcon';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        let fillType: 'full' | 'half' | 'none' = 'none';

        if (starValue <= rating) {
          fillType = 'full';
        } else if (starValue - 0.5 <= rating) {
          fillType = 'half';
        }

        return (
          <div key={index} className="relative">
            {/* Background star */}
            <StarIcon className="w-5 h-5 text-white/30" fillColor="currentColor" strokeColor="currentColor"/>

            {/* Filled star */}
            {(fillType === 'full' || fillType === 'half') && (
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: fillType === 'full' ? '100%' : '50%' }}
              >
                <StarIcon className="w-5 h-5 text-yellow-400" fillColor="currentColor" strokeColor="currentColor"/>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;