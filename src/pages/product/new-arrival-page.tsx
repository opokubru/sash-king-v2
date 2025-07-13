'use client';

import { useEffect, useState } from 'react';
import { fetchNewArrivals } from '@/lib/db/products';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/utils/types/product';
import { Spinner } from '@nextui-org/react';

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewArrivals()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen container px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">New Arrivals</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
