// app/product/[id]/page.tsx or pages/product/[id].tsx
'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/utils/types/product';
import { fetchProducts } from '@/lib/db/products';
import { Image, Button } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../components/related-products';

const ProductDetail = () => {
  const { name } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  console.log('ProductDetail rendered with name:', name);

  useEffect(() => {
    fetchProducts().then((all) => {
      const found = all.find((p) => p.id === name);
      console.log('Found product:', found);
      setProduct(found || null);
    });
  }, [name]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen container px-6 py-16 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Image
          src={product.image_url || 'https://placehold.co/400'}
          alt={product.name}
          width={500}
          className="rounded-lg"
        />

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-yellow-400">{product.name}</h2>
          <p className="text-lg text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-black">
            GHS {product.price.toFixed(2)}
          </p>
          {product?.discount && product?.discount > 0 && (
            <p className="text-sm text-green-600">{product.discount}% off</p>
          )}
          <p>
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p>
            <span className="font-semibold">Availability:</span>{' '}
            {product.in_stock ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>

          <Button
            color="primary"
            className="bg-yellow-400 text-black"
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      />
    </main>
  );
};

export default ProductDetail;
