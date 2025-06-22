'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/utils/types/product';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import { fetchProducts } from '@/lib/db/products';
import { ProductCard } from '@/components/ProductCard';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const RelatedProducts = ({
  currentProductId,
  category,
}: RelatedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 3, spacing: 20 },
      },
    },
  });

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  const related = products.filter(
    (p) => p.category === category && p.id !== currentProductId,
  );

  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <h3 className="text-2xl font-bold mb-4 text-yellow-400">
        Related Products
      </h3>

      <div ref={sliderRef} className="keen-slider">
        {related.map((product) => (
          <div key={product.id} className="keen-slider__slide">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
