// pages/index.tsx
import { fetchProducts } from '@/lib/db/products';
import { ProductCard } from '@/components/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '@/utils/types/product';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      jjj
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
};

export default Home;
