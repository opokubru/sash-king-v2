'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '@/utils/types/product';
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '@/store/features/cart';
import { getCurrencySymbol, parseToMoney } from '@/utils/helper';
import { RootState } from '@/store/store';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  const { id, name, price, discount, image_url, in_stock } = product;
  const finalPrice = discount ? price - price * (discount / 100) : price;
  const dispatch = useDispatch();

  // Find item in cart
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id),
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const isSizeRequired = product?.sizes && product.sizes.length > 0;
  const isColorRequired = product?.colors && product.colors.length > 0;

  const handleAddToCart = () => {
    if (isSizeRequired && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (isColorRequired && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    dispatch(
      addToCart({
        id,
        name,
        price,
        discount,
        image_url,
        in_stock,
        quantity: 1,
        selectedSize,
        selectedColor,
      }),
    );
    // setSelectedSize(null);
    // setSelectedColor(null);
    onClose(); // close modal if add succeeds
  };

  const handleIncrease = () =>
    dispatch(
      increaseQuantity({
        id: id!,
        selectedSize,
        selectedColor,
      }),
    );
  const handleDecrease = () => {
    if (cartItem?.quantity === 1) {
      dispatch(removeFromCart(id!));
    } else {
      dispatch(
        decreaseQuantity({
          id: id!,
          selectedSize,
          selectedColor,
        }),
      );
    }
  };

  return (
    <div className="relative bg-primary-white rounded-xl shadow-lg border border-primary/30 overflow-hidden">
      {/* Sold Out Badge */}
      {!in_stock && (
        <div className="z-50 absolute top-2 left-2 bg-danger text-white text-[10px] px-2 py-1 rounded  uppercase font-semibold">
          Out of Stock
        </div>
      )}

      {/* Product Image */}
      <Link to={`/product/${id}`} className="block p-3 ">
        <Image
          isZoomed
          src={image_url || 'https://placehold.co/400'}
          alt={name}
          width={500}
          height={500}
          className="object-cover w-full aspect-[1/1] rounded-lg"
        />
      </Link>

      {!compact && (
        <div className="p-3 pt-2">
          {/* Title */}
          <h3 className="text-sm font-semibold capitalize text-primary-black leading-tight line-clamp-2 md:min-h-[40px]">
            {name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm md:text-base font-bold text-primary-black">
              {getCurrencySymbol('GHS')} {parseToMoney(finalPrice)}
            </span>
            {discount && discount > 0 ? (
              <span className="text-xs md:text-sm text-gray-muted line-through">
                {getCurrencySymbol('GHS')} {parseToMoney(price)}
              </span>
            ) : (
              <p></p>
            )}
          </div>

          {/* Add to Cart or Quantity */}
          {in_stock ? (
            <AnimatePresence mode="wait">
              {cartItem ? (
                <motion.div
                  key="qty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-4 flex items-center justify-between bg-background p-2 rounded-md"
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
                  onClick={() => {
                    if (
                      (isSizeRequired && !selectedSize) ||
                      (isColorRequired && !selectedColor)
                    ) {
                      onOpen(); // open modal instead
                    } else {
                      handleAddToCart();
                    }
                  }}
                  className="mt-4 w-full text-sm font-semibold bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
                >
                  Add to Cart
                </motion.button>
              )}
            </AnimatePresence>
          ) : (
            <>
              <motion.button
                key="add"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-4 w-full text-sm font-semibold bg-primary bg-opacity-60 text-white py-2 rounded-md"
              >
                Out of Stock
              </motion.button>
            </>
          )}
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Select Options
          </ModalHeader>
          <ModalBody>
            {/* Size Selection */}
            {isSizeRequired && (
              <div>
                <p className="text-sm font-medium mb-2">Select Size</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded border ${
                        selectedSize === size
                          ? 'bg-primary text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {isColorRequired && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Select Color</p>
                <div className="flex gap-2 flex-wrap">
                  {product?.colors?.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-125 cursor-pointer ${
                        selectedColor === color
                          ? 'border-primary scale-125'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    ></button>
                  ))}
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark"
            >
              Confirm & Add to Cart
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
