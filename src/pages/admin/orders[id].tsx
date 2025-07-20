'use client';

import { useEffect, useState } from 'react';
import { Image, Spinner } from '@nextui-org/react';
import { getOrderById, Order } from '@/lib/db/orders';
import { Link, useParams } from 'react-router-dom';

export default function OrderViewPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = params.id;

  console.log({ orderId });

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderById(orderId as string);
        setOrder(data);
      } catch (err) {
        console.error('Failed to fetch order', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) return;
  <div className="h-screen flex items-center flex-col gap-1 justify-center">
    <Spinner size="sm" color="success" />
    Loading...
  </div>;
  if (!order)
    return (
      <div className="h-screen flex items-center justify-center">
        Order not found.
      </div>
    );

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Order Details</h2>

      <div className="mb-6 text-sm">
        <p>
          <strong>Customer:</strong> {order.first_name} {order.last_name}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Phone:</strong> {order.tel}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Ordered At:</strong>{' '}
          {new Date(order.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Delivered At:</strong>{' '}
          {order.delivered_at
            ? new Date(order.delivered_at).toLocaleString()
            : '—'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">Items Ordered</h3>
        <div className="grid gap-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-4 border-b py-4">
              <Image
                src={item.image || '/placeholder.png'}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md"
              />
              <div className="flex flex-col text-sm">
                <p className="font-semibold">{item.name}</p>
                {/* {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                {item.selectedColor && <p>Color: {item.selectedColor}</p>} */}
                <p>Qty: {item.quantity}</p>
                <p>Unit Price: ₵{item.price.toFixed(2)}</p>
                <p className="font-semibold">
                  Subtotal: ₵{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right text-lg font-bold">
          Total: ₵{order.total.toFixed(2)}
        </div>
      </div>

      <Link
        to="/admin/orders"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Back to orders
      </Link>
    </div>
  );
}
