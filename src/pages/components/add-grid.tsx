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
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';

function TopDealsCarousel({ topDeals }: { topDeals: Product[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % topDeals.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + topDeals.length) % topDeals.length);
  };

  return (
    <div className="relative h-full">
      {/* Carousel Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Top deals</h3>
        <Link
          to="/products/deals"
          className="text-sm text-primary hover:underline"
        >
          View more
        </Link>
      </div>

      {/* Carousel Content */}
      {topDeals?.length > 0 ? (
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="bg-accent-yellow text-xs font-semibold px-2 py-1 w-fit rounded mb-2">
                {topDeals[current]?.discount >= 20
                  ? '🔥 Hot deal'
                  : '180-day lowest price'}
              </div>
              <div className="relative">
                {topDeals[current]?.discount >= 20 && (
                  <span className="absolute top-2 left-2 bg-danger text-white text-xs px-2 py-0.5 rounded">
                    {topDeals[current].discount}% off
                  </span>
                )}
                <ProductCard product={topDeals[current]} compact />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <button
              onClick={prev}
              className="bg-white rounded-full shadow p-1 hover:bg-gray-100"
            >
              <Icon icon="si:chevron-left-fill" fontSize={20} />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <button
              onClick={next}
              className="bg-white rounded-full shadow p-1 hover:bg-gray-100"
            >
              <Icon
                icon="material-symbols:chevron-right-rounded"
                fontSize={20}
              />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-muted text-sm">No top deals right now.</p>
      )}
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
      <div className="bg-white rounded-xl p-4 shadow-sm h-[520px] flex flex-col">
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
          <div className="space-y-3 overflow-y-auto">
            <ProductCard product={under250[0]} compact />
            <div className="flex space-x-2 overflow-x-auto">
              {under250.slice(1, 4).map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[100px]">
                  <ProductCard product={product} compact />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-muted text-sm">
            No top ranking items available.
          </p>
        )}
      </div>

      {/* --- New Arrivals --- */}
      <div className="bg-white rounded-xl p-4 shadow-sm h-[520px] flex flex-col">
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
      <div className="bg-white rounded-xl p-4 shadow-sm h-[520px] flex flex-col relative">
        <TopDealsCarousel topDeals={topDeals} />
      </div>
    </div>
  );
}
