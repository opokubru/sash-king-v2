'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/db/products';
import { Product } from '@/utils/types/product';
import { ProductCard } from '@/components/ProductCard';
import { Spinner } from '@nextui-org/react';
import { useCategories } from '@/utils/hooks/categories';
import { useParams } from 'react-router-dom';

const SelectedCategoryPage = () => {
  const { name } = useParams(); // 'name' is the category name in URL
  const { categories, loading: loadingCategories } = useCategories();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (name) {
      fetchProducts(0, 20, name) // fetch 21 products of this category
        .then(setProducts)
        .catch(console.error)
        .finally(() => setLoadingProducts(false));
    }
  }, [name]);

  const category = categories.find((cat) => cat.value === name);

  if (loadingCategories || loadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner color="warning" label="Loading..." />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Category not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen container px-6 py-10 text-black bg-transparent">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={category.image_url}
          alt={category.label}
          className="w-12 h-12 object-cover rounded-md"
        />
        <h1 className="text-3xl font-bold text-primary">{category.label}</h1>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default SelectedCategoryPage;
