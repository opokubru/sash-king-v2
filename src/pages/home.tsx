'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/db/products';
import { Product } from '@/utils/types/product';
import { ProductCard } from '@/components/ProductCard';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import AdGrid from './components/add-grid';
import { useCategories } from '@/utils/hooks/categories';

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-10 bg-white px-6 py-10 rounded-br-none rounded-b-[10rem] rounded-t-xl shadow-lg border text-center h-[40vh]"
      >
        <h1 className="text-4xl font-bold text-yellow-400 mb-3">
          Welcome to SNEAKZ
        </h1>
        <p className="text-gray-700 mb-6">
          Your go-to store for the latest in streetwear, kicks, and bold
          accessories.
        </p>

        <div className="flex justify-center">
          <Input
            label=""
            placeholder="Search products..."
            startContent={
              <Icon icon="mdi:magnify" className="text-yellow-400" />
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-[250px]" // adjust width here
            size="md"
          />
        </div>
        <p>Frequently searched</p>
      </motion.div>

      <main className="min-h-screen container  px-6 py-16 text-black">
        <AdGrid />

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 items-center justify-center mx-auto place-items-center">
          <Select
            label="Category"
            selectedKeys={[category]}
            onSelectionChange={(keys) =>
              setCategory(Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="">All</SelectItem>

            {/* ✅ Fix: Wrap in fragment or return array directly */}
            <>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </>
          </Select>

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
