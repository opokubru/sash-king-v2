import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';

interface OrderItem {
  name: string;
  image: string;
  price: number;
  isCustom?: boolean;
  quantity: number;
  customImage?: string;
  customTextLeft?: string;
  customTextRight?: string;
  uploadedImageLeft?: string;
  uploadedImageRight?: string;
}

interface OrderRecord {
  id: number;
  created_at: string;
  customer: string;
  order: OrderItem[];
  total_amount: number;
  status: 'pending' | 'delivered' | 'cancelled';
  customer_email: string;
  customer_phone: string;
  customer_location: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const OrderViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Check authentication and fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/signin');
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to fetch order details');
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', order.id);

      if (error) throw error;

      setOrder((prev) =>
        prev ? { ...prev, status: newStatus as OrderRecord['status'] } : null,
      );
      toast.success('Status updated');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return `GH₵${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Order not found
          </h2>
          <button
            onClick={() => navigate('/admin')}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            ← Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-slate-900">
                  Order #{order.id}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 truncate">
                  {formatDate(order.created_at)}
                </p>
              </div>
            </div>
            <select
              value={order.status || 'pending'}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 flex-shrink-0 ${
                statusColors[order.status || 'pending']
              }`}
            >
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 sm:px-6 sm:py-6 max-w-6xl mx-auto">
        {/* Quick Actions - Mobile */}
        <div className="mb-4 flex gap-2 sm:hidden">
          {order.customer_phone && (
            <a
              href={`tel:${order.customer_phone}`}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call
            </a>
          )}
          {order.customer_phone && (
            <a
              href={`https://wa.me/${order.customer_phone.replace(
                /\D/g,
                '',
              )}?text=Hi%20${encodeURIComponent(
                order.customer || '',
              )},%20regarding%20order%20%23${order.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-green-500 text-white font-medium rounded-lg text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          )}
        </div>

        {/* Customer Info Card - Mobile Priority */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 sm:hidden">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Customer
          </h2>
          <div className="space-y-2">
            <p className="font-semibold text-slate-900 text-lg">
              {order.customer || 'N/A'}
            </p>
            {order.customer_email && (
              <p className="text-sm text-slate-600">{order.customer_email}</p>
            )}
            {order.customer_phone && (
              <p className="text-sm text-slate-600">{order.customer_phone}</p>
            )}
            {order.customer_location && (
              <p className="text-sm text-slate-600">
                {order.customer_location}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">
                  Items ({order.order?.length || 0})
                </h2>
                <span className="text-lg font-bold text-slate-900">
                  {formatCurrency(order.total_amount || 0)}
                </span>
              </div>

              <div className="divide-y divide-slate-200">
                {order.order?.map((item, index) => (
                  <div key={index} className="p-4">
                    {/* Item Header */}
                    <div className="flex gap-3 sm:gap-4">
                      {/* Product Image */}
                      {(item.customImage || item.image) && (
                        <img
                          src={item.customImage || item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                          onClick={() =>
                            setSelectedImage(item.customImage || item.image)
                          }
                        />
                      )}

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                              {item.name}
                            </h3>
                            {item.isCustom && (
                              <span className="inline-flex items-center px-2 py-0.5 mt-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                Custom
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-slate-900 flex-shrink-0 text-sm sm:text-base">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>

                        <div className="mt-2 flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                          <span>Qty: {item.quantity}</span>
                          <span>×</span>
                          <span>{formatCurrency(item.price)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Custom Text */}
                    {(item.customTextLeft || item.customTextRight) && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Custom Text
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {item.customTextLeft && (
                            <div>
                              <p className="text-xs text-slate-500">Left</p>
                              <p className="font-medium text-slate-900 text-sm break-words">
                                {item.customTextLeft}
                              </p>
                            </div>
                          )}
                          {item.customTextRight && (
                            <div>
                              <p className="text-xs text-slate-500">Right</p>
                              <p className="font-medium text-slate-900 text-sm break-words">
                                {item.customTextRight}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Uploaded Images */}
                    {(item.uploadedImageLeft || item.uploadedImageRight) && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Uploaded Images
                        </p>
                        <div className="flex gap-2">
                          {item.uploadedImageLeft && (
                            <div>
                              <p className="text-xs text-slate-500 mb-1">
                                Left
                              </p>
                              <img
                                src={item.uploadedImageLeft}
                                alt="Left upload"
                                className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() =>
                                  setSelectedImage(item.uploadedImageLeft!)
                                }
                              />
                            </div>
                          )}
                          {item.uploadedImageRight && (
                            <div>
                              <p className="text-xs text-slate-500 mb-1">
                                Right
                              </p>
                              <img
                                src={item.uploadedImageRight}
                                alt="Right upload"
                                className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() =>
                                  setSelectedImage(item.uploadedImageRight!)
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Desktop */}
          <div className="hidden sm:block space-y-4">
            {/* Customer Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
              <h2 className="font-semibold text-slate-900 mb-4">Customer</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Name
                  </p>
                  <p className="mt-1 font-medium text-slate-900">
                    {order.customer || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="mt-1 text-slate-900 break-all">
                    {order.customer_email || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="mt-1 text-slate-900">
                    {order.customer_phone || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Location
                  </p>
                  <p className="mt-1 text-slate-900">
                    {order.customer_location || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
              <h2 className="font-semibold text-slate-900 mb-4">Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(order.total_amount || 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span className="text-slate-500">TBD</span>
                </div>
                <div className="border-t border-slate-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="font-bold text-lg text-slate-900">
                      {formatCurrency(order.total_amount || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
              <h2 className="font-semibold text-slate-900 mb-4">Actions</h2>
              <div className="space-y-2">
                {order.customer_email && (
                  <a
                    href={`mailto:${order.customer_email}?subject=Order%20%23${order.id}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email
                  </a>
                )}
                {order.customer_phone && (
                  <>
                    <a
                      href={`tel:${order.customer_phone}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Call
                    </a>
                    <a
                      href={`https://wa.me/${order.customer_phone.replace(
                        /\D/g,
                        '',
                      )}?text=Hi%20${encodeURIComponent(
                        order.customer || '',
                      )},%20regarding%20order%20%23${order.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Order Summary */}
        <div className="mt-4 bg-white rounded-xl border border-slate-200 p-4 sm:hidden">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Order Total</span>
            <span className="text-xl font-bold text-slate-900">
              {formatCurrency(order.total_amount || 0)}
            </span>
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default OrderViewPage;
