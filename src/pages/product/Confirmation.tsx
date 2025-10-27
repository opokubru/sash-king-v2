import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/features/cart';
import { CartItem } from '@/store/features/cart';
import toast from 'react-hot-toast';
import { CustomButton } from '@/components/shared/shared_customs';
import { AnimatePresence, motion } from 'framer-motion';

interface OrderData {
  currencySymbol: string;
  total: number;
  readyBy: number;
  name: string;
  textLeft: string;
  textRight: string;
  modelImage: string;
  customSizeValues: { [key: string]: number };
  uploadedImageLeft?: string;
  uploadedImageRight?: string;
  fontSizeLeft?: number;
  fontSizeRight?: number;
  fontFamily?: string;
  textColor?: string;
}

const Confirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    // Get order data from sessionStorage
    const storedData = sessionStorage.getItem('orderData');
    if (storedData) {
      setOrderData(JSON.parse(storedData));
    } else {
      // If no data, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const handleAddToCart = () => {
    if (!orderData) return;

    const cartItem: CartItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${orderData.name}`,
      price: orderData.total,
      quantity: 1,
      image_url: orderData.modelImage,
      isCustom: true,
      customTextLeft: orderData.textLeft,
      customTextRight: orderData.textRight,
      customImage: orderData.modelImage,
      uploadedImageLeft: orderData.uploadedImageLeft,
      uploadedImageRight: orderData.uploadedImageRight,
      fontSizeLeft: orderData.fontSizeLeft,
      fontSizeRight: orderData.fontSizeRight,
      fontFamily: orderData.fontFamily,
      textColor: orderData.textColor,
    };

    dispatch(addToCart(cartItem));
    setAddedToCart(true);
    toast.success('Added to cart!', { duration: 3000 });
  };

  const handleGoToCheckout = () => {
    navigate('/checkout');
  };

  if (!orderData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-4"
            animate={{ scale: addedToCart ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <i className="pi pi-check-circle text-6xl text-green-500"></i>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900">
            Order Confirmation
          </h1>
          <AnimatePresence>
            {addedToCart && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-600 font-semibold mt-2"
              >
                ✓ Added to Cart!
              </motion.p>
            )}
          </AnimatePresence>
          {!addedToCart && (
            <p className="text-gray-600 mt-2">
              Your custom sash order has been received!
            </p>
          )}
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Details
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600 font-medium">Product: </span>
              <span className="text-gray-900 font-semibold">
                {orderData.name}
              </span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Total Price: </span>
              <span className="text-gray-900 font-semibold">
                {orderData.currencySymbol}
                {orderData.total}
              </span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Ready In: </span>
              <span className="text-gray-900 font-semibold">
                {orderData.readyBy} days
              </span>
            </div>
            {(orderData.textLeft || orderData.textRight) && (
              <div>
                <span className="text-gray-600 font-medium">Custom Text: </span>
                <div className="mt-2 space-y-1">
                  {orderData.textLeft && (
                    <p className="text-gray-900">Left: {orderData.textLeft}</p>
                  )}
                  {orderData.textRight && (
                    <p className="text-gray-900">
                      Right: {orderData.textRight}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Preview Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Custom Design
          </h2>
          {orderData.modelImage && (
            <div className="flex justify-center">
              <img
                src={orderData.modelImage}
                alt="Custom sash design"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <AnimatePresence mode="wait">
              {addedToCart ? (
                <motion.div
                  key="checkout"
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 w-full"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                    className="flex-1 w-full"
                  >
                    <CustomButton
                      onPress={handleGoToCheckout}
                      variant="primary"
                      className="w-full"
                    >
                      Go to Checkout
                      <i className="pi pi-arrow-right"></i>
                    </CustomButton>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                    className="flex-1"
                  >
                    <CustomButton
                      onPress={() => navigate('/')}
                      variant="secondary"
                      className="w-full"
                    >
                      <i className="pi pi-home mr-2"></i>
                      Continue Shopping
                    </CustomButton>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="addToCart"
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center w-full"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                    className="flex-1"
                  >
                    <CustomButton
                      onPress={handleAddToCart}
                      disabled={addedToCart}
                      variant="primary"
                      className="w-full"
                    >
                      <i className="pi pi-shopping-cart mr-2"></i>
                      {'Add to Cart'}
                    </CustomButton>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                    className="flex-1"
                  >
                    <CustomButton
                      onPress={() => navigate(-1)}
                      variant="secondary"
                      className="w-full"
                    >
                      <i className="pi pi-plus-circle mr-2"></i>
                      Go Back to Design
                    </CustomButton>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
