'use client';

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllProducts } from '@/lib/db/products';
import { ProductCard } from '@/components/ProductCard';
import { Spinner } from '@nextui-org/react';
import { Product } from '@/utils/types/product';
import Fuse from 'fuse.js';

export default function SearchPage() {
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams(); // ✅ Fix here
  const q = searchParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    if (!q) {
      setFiltered([]);
      setLoading(false);
      return;
    }

    fetchAllProducts()
      .then((res) => {
        const fuse = new Fuse(res, {
          keys: ['name', 'description', 'category'],
          threshold: 0.4, // adjust sensitivity (0.0 = strict, 1.0 = loose)
        });
        const results = fuse.search(q);
        setFiltered(results.map((r) => r.item));
      })
      .finally(() => setLoading(false));
  }, [q]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner color="warning" label="Searching..." />
      </div>
    );
  }

  return (
    <main className="min-h-screen container px-6 py-16 text-black">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-primary">"{q}"</span>
      </h1>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
