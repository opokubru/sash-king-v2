'use client';

import { motion } from 'framer-motion';
import { Product } from '@/utils/types/product';
import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/features/cart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, discount, image_url, in_stock } = product;
  const finalPrice = discount ? price - price * (discount / 100) : price;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        discount,
        image_url,
        in_stock,
        quantity: 1,
      }),
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-2xl border border-yellow-400 shadow-md overflow-hidden"
    >
      {!in_stock && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
          Sold Out
        </div>
      )}

      <Link
        to={`/product/${id}`}
        className="flex items-center justify-center h-[60%]"
      >
        <Image
          isZoomed
          src={image_url || 'https://placehold.co/400'}
          alt={name}
          width={140}
          height="100%"
        />
      </Link>

      <div className="p-4">
        <h3 className="text-md font-semibold text-black truncate">{name}</h3>
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

        {/* Add to Cart */}
        {in_stock && (
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full text-sm font-medium bg-yellow-400 text-black py-2 rounded-md hover:opacity-90"
          >
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );
};
