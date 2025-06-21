'use client';

import { motion } from 'framer-motion';
import { Product } from '@/utils/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, discount, image_url, in_stock } = product;

  const finalPrice = discount ? price - price * (discount / 100) : price;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-2xl border border-yellow-400 shadow-md overflow-hidden"
    >
      {/* Sold Out Badge */}
      {!in_stock && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
          Sold Out
        </div>
      )}

      {/* Product Image */}
      <img
        src={image_url}
        alt={name}
        className="w-full h-60 object-cover object-center"
      />

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-md font-semibold text-black truncate">{name}</h3>

        {/* Price Row */}
        <div className="mt-2 flex items-center gap-2">
          {discount ? (
            <>
              <p className="text-yellow-500 font-bold text-sm">
                GHS {finalPrice.toFixed(2)}
              </p>
              <p className="text-gray-400 text-xs line-through">
                GHS {price.toFixed(2)}
              </p>
              <span className="ml-auto text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded">
                -{discount}%
              </span>
            </>
          ) : (
            <p className="text-yellow-500 font-bold text-sm">
              GHS {price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
