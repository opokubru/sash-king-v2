/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchProducts } from '@/lib/db/products';
import { Product } from '@/utils/types/product';
import { ProductCard } from '@/components/ProductCard';
import AdGrid from './components/add-grid';
import HeroSection from './components/hero';
// import { useCategories } from '@/utils/hooks/categories';

const BATCH_SIZE = 12;

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const collectionsRef = useRef<HTMLDivElement | null>(null);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const from = page * BATCH_SIZE;
      const to = from + BATCH_SIZE - 1;
      const newProducts = await fetchProducts(from, to);

      setProducts((prev) => [...prev, ...newProducts]);
      setPage((prev) => prev + 1);
      if (newProducts.length < BATCH_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching more products:', err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    loadMoreProducts();
  }, []); // Load first page on mount

  // Set up IntersectionObserver to trigger loadMoreProducts
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1 },
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMoreProducts, hasMore]);

  return (
    <>
      <HeroSection
      // onExploreClick={() =>
      //   collectionsRef.current?.scrollIntoView({ behavior: 'smooth' })
      // }
      />

      <main className="min-h-screen max-w-7xl mx-auto px-6 py-16 text-black">
        <AdGrid />

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          ref={collectionsRef}
        >
          {products?.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>

        {/* Sentinel div to observe for infinite scroll */}
        {hasMore && (
          <div
            ref={observerRef}
            className="mt-10 h-10 flex items-center justify-center text-gray-muted"
          >
            {loading ? 'Loading more...' : 'Scroll to load more'}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
