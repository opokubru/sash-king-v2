'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/db/products';
import { Product } from '@/utils/types/product';
import { ProductCard } from '@/components/ProductCard';
import { Spinner, Image } from '@nextui-org/react';
import { useCategories } from '@/utils/hooks/categories';

const AllCategoriesPage = () => {
  const { categories, loading: loadingCategories } = useCategories();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoadingProducts(false));
  }, []);

  if (loadingCategories || loadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner color="warning" label="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen container px-6 py-10 text-black bg-transparent">
      <h1 className="text-3xl font-bold text-yellow-500 text-center mb-10">
        Explore by Categories
      </h1>

      {categories.map((cat) => {
        const filtered = products.filter(
          (product) => product.category === cat.value,
        );

        if (filtered.length === 0) return null;

        return (
          <div key={cat.value} className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={cat.image_url}
                alt={cat.label}
                width={50}
                className="rounded-lg"
              />
              <h2 className="text-2xl font-semibold text-yellow-600">
                {cat.label}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllCategoriesPage;
