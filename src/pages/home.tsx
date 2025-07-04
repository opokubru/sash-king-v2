'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/db/products';
import { Product } from '@/utils/types/product';
import { ProductCard } from '@/components/ProductCard';
import AdGrid from './components/add-grid';
import { useCategories } from '@/utils/hooks/categories';
import HeroSection from './components/hero';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  // const [inStockOnly, setInStockOnly] = useState(false);

  const { categories: CATEGORIES } = useCategories();

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  const filtered = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (category ? p.category === category : true)
      // && (!inStockOnly || p.in_stock)
    );
  });

  return (
    <>
      <HeroSection />

      <main className="min-h-screen container  px-6 py-16 text-black">
        <AdGrid />

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 items-center justify-center mx-auto place-items-center">
          {/* <Select
            label="Category"
            selectedKeys={[category]}
            onSelectionChange={(keys) =>
              setCategory(Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="">All</SelectItem>

            <>
              {CATEGORIES?.map((cat) => (
                <SelectItem key={cat?.value} value={cat?.value}>
                  {cat?.label}
                </SelectItem>
              ))}
            </>
          </Select> */}

          {/* <Checkbox
            isSelected={inStockOnly}
            onValueChange={setInStockOnly}
            className="mt-6"
          >
            In Stock Only
          </Checkbox> */}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
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
