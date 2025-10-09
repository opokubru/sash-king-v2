'use client';

import { getCurrencySymbol, parseToMoney } from '@/utils/helper';
import { Product } from '@/utils/types/product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, discount, image } = product;
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
      <Link to={`/product/${id}`} className="block">
        <div className="">
          <img
            src={image || 'https://placehold.co/400'}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="mt-2">
            {/* <p className="text-sm text-gray-500">{name}</p> */}
            <p className="text-sm ">
              {getCurrencySymbol('GHS') + parseToMoney(finalPrice)}
            </p>
            {/* <p className="text-sm text-gray-500">{name}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};
