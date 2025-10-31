'use client';

import { getCurrencySymbol, parseToMoney } from '@/utils/helper';
import { Product } from '@/utils/types/product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  height?: string;
}

export const ProductCard = ({
  product,
  height = 'h-[400px] md:h-[500px]',
}: ProductCardProps) => {
  const { name, price, discount, image } = product;
  const finalPrice = discount ? price - price * (discount / 100) : price;

  return (
    <div className="relative group">
      {/* Sale Badge */}
      {/* {discount && discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{discount}%
        </div>
      )} */}

      {/* Sold Out Badge */}
      {/* {!in_stock && (
        <div className="absolute top-2 left-2 z-10 bg-gray-500 text-white text-xs px-2 py-1 rounded">
          Out of Stock
        </div>
      )} */}

      {/* Product Image */}
      <Link to={`/product/${name}`} className="block">
        <div className={`relative ${height} group`}>
          <img
            src={image || 'https://placehold.co/400'}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />

          {/* Price Overlay */}
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
            {getCurrencySymbol('GHS') + parseToMoney(finalPrice)}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-md flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                Edit Template
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
