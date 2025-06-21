'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/db/products';
import { Product } from '@/utils/types/product';
import { ProductCard } from '@/components/ProductCard';
import { Input, Select, SelectItem, Checkbox } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { CATEGORIES } from '@/utils/data/categories';
import { CategoryType } from '@/utils/types/category';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  const filtered = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (category ? p.category === category : true) &&
      (!inStockOnly || p.in_stock)
    );
  });

  return (
    <main className="min-h-screen container  px-6 py-16 text-black">
      {/* Hero Intro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">
          Welcome to SNEAKZ
        </h1>
        <p className="text-gray-700">
          Your go-to store for the latest in streetwear, kicks, and bold
          accessories.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 items-center justify-center mx-auto place-items-center">
        <Input
          label="Search"
          placeholder="Search products..."
          startContent={<Icon icon="mdi:magnify" className="text-yellow-400" />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          label="Category"
          selectedKeys={[category]}
          onSelectionChange={(keys) =>
            setCategory(Array.from(keys)[0] as string)
          }
        >
          <SelectItem key="">All</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem
              key={cat.value}
              value={cat.value}
              // startContent={
              //   <Icon icon={cat.icon} className="text-yellow-400" />
              // }
            >
              {cat.label}
            </SelectItem>
          ))}
        </Select>

        <Checkbox
          isSelected={inStockOnly}
          onValueChange={setInStockOnly}
          className="mt-6"
        >
          In Stock Only
        </Checkbox>
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
  );
};

export default Home;
