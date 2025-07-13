/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useRef, useState } from 'react';
import { fetchProducts } from '@/lib/db/products';
import { Product } from '@/utils/types/product';
import { ProductCard } from '@/components/ProductCard';
import AdGrid from './components/add-grid';
import HeroSection from './components/hero';
// import { useCategories } from '@/utils/hooks/categories';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [query, setQuery] = useState('');
  // const [category, setCategory] = useState('');
  // // const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  // const filtered = products.filter((p) => {
  //   return (
  //     p.name.toLowerCase().includes(query.toLowerCase()) &&
  //     (category ? p.category === category : true)
  //     // && (!inStockOnly || p.in_stock)
  //   );
  // });

  const collectionsRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <HeroSection
        onExploreClick={() =>
          collectionsRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      />

      <main className="min-h-screen max-w-7xl mx-auto  px-6 py-16 text-black">
        <AdGrid />

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          ref={collectionsRef}
        >
          {products?.length > 0 ? (
            products?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
