// app/product/[id]/page.tsx or pages/product/[id].tsx
'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/utils/types/product';
import { fetchProducts } from '@/lib/db/products';
import { Image, Spinner } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../components/related-products';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '@/store/features/cart';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencySymbol, parseToMoney } from '@/utils/helper';
import { AnimatePresence, motion } from 'framer-motion';
import { RootState } from '@/store/store';

const ProductDetail = () => {
  const { name } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === (product?.id as string)),
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product?.id as string,
        name: product?.name as string,
        price: product?.price as number,
        discount: product?.discount,
        image_url: product?.image_url as string,
        quantity: 1,
        in_stock: product?.in_stock,
      }),
    );
  };

  const handleIncrease = () =>
    dispatch(increaseQuantity(product?.id as string));
  const handleDecrease = () => {
    if (cartItem?.quantity === 1) {
      dispatch(removeFromCart(product?.id as string));
    } else {
      dispatch(decreaseQuantity(product?.id as string));
    }
  };

  useEffect(() => {
    fetchProducts().then((all) => {
      const found = all.find((p) => p?.id === name);
      // console.log('Found product:', found);
      setProduct(found || null);
    });
  }, [name]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner size="sm" color="success" />
      </div>
    );
  }

  const finalPrice =
    product?.discount && product?.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (
    <main className="min-h-screen container px-4 sm:px-6 lg:px-8 py-16 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="w-full">
          <Image
            src={product.image_url || 'https://placehold.co/500'}
            alt={product.name}
            width={500}
            className="rounded-xl object-cover w-full max-w-md mx-auto"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl capitalize font-extrabold text-primary">
              {product.name}
            </h1>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-bold text-black">
              {getCurrencySymbol('GHS')} {parseToMoney(finalPrice)}
              {product?.discount && (
                <span className="text-sm text-danger line-through ml-3 font-normal">
                  {getCurrencySymbol('GHS')} {parseToMoney(product.price)}
                </span>
              )}
            </p>

            {product?.discount && product?.discount > 0 ? (
              <span className="inline-block bg-danger text-white text-xs px-3 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            ) : (
              <p></p>
            )}

            <p>
              <span className="font-semibold text-gray-800 capitalize">
                Category:
              </span>{' '}
              <span className="capitalize">{product.category}</span>
            </p>

            <p>
              <span className="font-semibold text-gray-800">Availability:</span>{' '}
              {product.in_stock ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </p>
          </div>

          {product?.in_stock && (
            <AnimatePresence mode="wait">
              {cartItem ? (
                <motion.div
                  key="qty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-4 flex items-center justify-between bg-background p-2 rounded-md w-[10rem]"
                >
                  <button
                    onClick={handleDecrease}
                    className="md:w-8 md:h-8 w-6 h-6 flex items-center justify-center text-lg font-bold text-primary border border-primary rounded hover:bg-primary hover:text-white transition"
                  >
                    –
                  </button>
                  <span className="text-xs md:text-sm font-medium text-primary-black">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="md:w-8 md:h-8 w-6 h-6 flex items-center justify-center text-lg font-bold text-primary border border-primary rounded hover:bg-primary hover:text-white transition"
                  >
                    +
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="add"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  onClick={handleAddToCart}
                  className="mt-4 w-[10rem] text-sm font-semibold bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition"
                >
                  Add to Cart
                </motion.button>
              )}
            </AnimatePresence>
          )}
        </div>
        {product?.description && (
          <div>
            <h3 className="text-primary font-medium">Description</h3>
            <p className="text-gray-700 text-lg">{product.description}</p>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProducts
          currentProductId={product?.id as string}
          category={product?.category as string}
        />
      </div>
    </main>
  );
};

export default ProductDetail;
