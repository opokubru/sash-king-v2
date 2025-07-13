'use client';

import { Product } from '@/utils/types/product';
import { useEffect, useState } from 'react';
import {
  fetchUnder100,
  fetchNewArrivals,
  fetchTopDeals,
} from '@/lib/db/products';
import { ProductCard } from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function TopDealsCarousel({ topDeals }: { topDeals: Product[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (!topDeals?.length) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Top deals</h3>
          <Link
            to="/products/deals"
            className="text-sm text-primary hover:underline"
          >
            View more
          </Link>
        </div>
        <p className="text-gray-muted text-sm">No top deals right now.</p>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Top deals</h3>
        <Link
          to="/products/deals"
          className="text-sm text-primary hover:underline"
        >
          View more
        </Link>
      </div>

      <Slider {...settings}>
        {topDeals?.map((product) => (
          <div key={product.id} className="relative px-2">
            {/* Card Container */}
            <div className="relative">
              {/* Discount Tag (Top Right or Top Left) */}
              {product?.discount && product.discount >= 20 && (
                <span className="absolute top-2 left-2 bg-danger text-white text-xs px-2 py-0.5 rounded z-10">
                  {product.discount}% off
                </span>
              )}

              <div className="absolute z-50 top-0 right-2 bg-accent-yellow text-xs font-semibold px-2 py-1 rounded z-10">
                {product?.discount ? `${product.discount}% off 🔥` : 'Deal'}
              </div>

              {/* Product */}
              <ProductCard product={product} compact />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default function AdGrid() {
  const [under250, setUnder250] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topDeals, setTopDeals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [cheap, arrivals, deals] = await Promise.all([
          fetchUnder100(),
          fetchNewArrivals(),
          fetchTopDeals(),
        ]);
        setUnder250(cheap);
        setNewArrivals(arrivals);
        setTopDeals(deals);
      } catch (error) {
        console.error('Error loading ad section:', error);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
      {/* --- Top Selling --- */}
      <div className="bg-white rounded-xl p-4 shadow-sm h-[450px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Top selling</h3>
          <Link
            to="/products/top-ranking"
            className="text-sm text-primary hover:underline"
          >
            View more
          </Link>
        </div>

        {under250.length > 0 ? (
          <div className="flex flex-col gap-3 flex-grow overflow-hidden">
            {/* Primary product — takes full height if it's the only one */}
            <div
              className={
                under250.length === 1
                  ? 'flex-grow overflow-hidden'
                  : 'flex-[0.6] min-h-0'
              }
            >
              <ProductCard product={under250[0]} compact />
            </div>

            {/* Remaining products as horizontal scroll */}
            {/* {under250.length > 1 && (
              <div className="flex-[0.4] min-h-0">
                <div className="flex space-x-2 overflow-x-auto h-full">
                  {under250.slice(1, 4).map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-[100px] h-full"
                    >
                      <ProductCard product={product} compact />
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        ) : (
          <p className="text-gray-muted text-sm">
            No top ranking items available.
          </p>
        )}
      </div>

      {/* --- New Arrivals --- */}
      <div className="bg-white rounded-xl p-4 shadow-sm h-[450px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">New arrivals</h3>
          <Link
            to="/products/new"
            className="text-sm text-primary hover:underline"
          >
            View more
          </Link>
        </div>
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        ) : (
          <p className="text-gray-muted text-sm">No new arrivals today.</p>
        )}
      </div>

      {/* --- Top Deals --- */}
      <div className="bg-white rounded-xl p-4 shadow-sm h-[450px] flex flex-col relative">
        <TopDealsCarousel topDeals={topDeals} />
      </div>
    </div>
  );
}
