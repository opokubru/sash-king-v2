'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { PaystackButton } from 'react-paystack';
import { useState } from 'react';
import { variables } from '@/utils/env';
import toast from 'react-hot-toast';
import {
  CartItem,
  decreaseQuantity,
  increaseQuantity,
  resetCart,
} from '@/store/features/cart';
import { Link, useNavigate } from 'react-router-dom';
import { LogoComponent } from '@/components/logo-componanent';
import { Button } from '@nextui-org/react';
import { getCurrencySymbol, parseToMoney } from '@/utils/helper';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { addOrder } from '@/lib/db/orders';

const publicKey = variables.VITE_PAYSTACK_PUBLIC_KEY;

const Checkout = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tel, setTel] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const totalAmount = items.reduce((acc, item) => {
    const finalPrice = item.discount
      ? item.price - item.price * (item.discount / 100)
      : item.price;
    return acc + finalPrice * item.quantity;
  }, 0);

  const paystackProps = {
    currency: 'GHS',
    email,
    amount: totalAmount * 100,
    publicKey,
    text: 'Pay Now',
    onSuccess: async () => {
      dispatch(resetCart());

      toast.success('Payment successful! Your order is placed.', {
        duration: 6000,
      });

      const userInfo = {
        firstName,
        lastName,
        email,
        tel,
        location: city,
        items: items.map((item: CartItem) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          discount: item.discount,
          size: item.selectedSize,
          color: item.selectedColor,
        })),
        subject: 'New Product Order',
        dateTime: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }),
        total: totalAmount,
      };

      await fetch(variables.VITE_FORMSPREE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      // addOrder(userInfo);
    },
    onClose: () =>
      toast.error('Payment was not completed.', {
        duration: 5000,
      }),
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-[rgba(197,195,195,0.165)] text-black">
      {items.length === 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center">
          <LogoComponent />
          <p>You have no products in cart</p>
          <Button onPress={() => navigate('/')}>Go Home</Button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-primary">Checkout</h1>

          {/* Cart Summary */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center  ">
                  <div className="flex items-center gap-2">
                    <img width="15%" src={item.image_url} alt={item.name} />
                    <div>
                      <p className="font-semibold capitalize">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} | {getCurrencySymbol('GHS')}{' '}
                        {parseToMoney(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center   w-full">
                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => dispatch(decreaseQuantity(item.id!))}
                      >
                        <Icon icon="charm:minus" />
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => dispatch(increaseQuantity(item.id!))}
                      >
                        <Icon icon="stash:plus-solid" />
                      </Button>
                    </div>

                    <div className=" flex items-center gap-4 ml-4">
                      {item.selectedSize && (
                        <p className="text-xs text-gray-600">
                          Size:
                          <p className="font-medium">{item.selectedSize}</p>
                        </p>
                      )}
                      {item.selectedColor && (
                        <p className="text-xs text-gray-600">
                          Color: <p>{item.selectedColor}</p>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-sm font-bold text-primary flex gap-2 whitespace-nowrap ">
                  {getCurrencySymbol('GHS')}{' '}
                  {parseToMoney(
                    item.quantity *
                      (item.discount
                        ? item.price - item.price * (item.discount / 100)
                        : item.price),
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 text-right font-bold text-lg">
            Total: {getCurrencySymbol('GHS')} {parseToMoney(totalAmount)}
          </div>

          {/* User Details Form */}
          <div className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full border px-4 py-2 rounded-lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border px-4 py-2 rounded-lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-2 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border px-4 py-2 rounded-lg"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full border px-4 py-2 rounded-lg"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <PaystackButton
              {...paystackProps}
              className="w-full bg-primary py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              By clicking pay, you agree to our{' '}
              <Link
                to="/terms-of-service"
                className="underline text-primary hover:text-primary/80"
              >
                Terms of Service
              </Link>{' '}
            </p>{' '}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
