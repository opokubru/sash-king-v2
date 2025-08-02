'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface HoverSlideshowImageProps {
  images: string[];
  className?: string;
  alt?: string;
}

const HoverSlideshowImage = ({
  images,
  className = '',
  alt = 'slideshow',
}: HoverSlideshowImageProps) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 2500);
    } else {
      setIndex(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, images.length]);

  return (
    <motion.div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 0.97 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="flex w-full h-full absolute top-0 left-0 transition-transform duration-700 ease-in-out"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${index * (100 / images.length)}%)`,
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={alt}
            className="w-full h-full object-cover rounded-2xl"
            style={{ width: `${100 / images.length}%` }}
          />
        ))}
      </div>

      {/* Dot indicators */}
      {isHovered && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HoverSlideshowImage;
