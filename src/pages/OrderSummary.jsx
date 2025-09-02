import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useApp} from '../context/AppContext';

const OrderSummary = () => {
  const {orderId} = useParams();
  const navigate = useNavigate();
  const {state} = useApp();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundOrder = state.orders.find((o) => o.id === parseInt(orderId));
    if (!foundOrder) {
      navigate('/');
      return;
    }
    setOrder(foundOrder);
    setLoading(false);
  }, [orderId, state.orders, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Order not found
          </h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for your order. We're preparing your delicious meal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Order Details
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">#{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{formatDate(order.orderDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Type:</span>
              <span className="font-medium capitalize">
                {order.customerInfo.orderType}
              </span>
            </div>
            {order.customerInfo.orderType === 'delivery' && (
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">
                  {formatDate(order.estimatedDelivery)}
                </span>
              </div>
            )}
          </div>

          {/* Customer Information */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Customer Information
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Name:</span>{' '}
                {order.customerInfo.firstName} {order.customerInfo.lastName}
              </p>
              <p>
                <span className="text-gray-600">Email:</span>{' '}
                {order.customerInfo.email}
              </p>
              <p>
                <span className="text-gray-600">Phone:</span>{' '}
                {order.customerInfo.phone}
              </p>
              {order.customerInfo.orderType === 'delivery' && (
                <p>
                  <span className="text-gray-600">Address:</span>{' '}
                  {order.customerInfo.address}, {order.customerInfo.city}{' '}
                  {order.customerInfo.zipCode}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Order Items
          </h2>

          <div className="space-y-4 mb-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=No+Image';
                  }}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Tracking */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Order Progress
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white mb-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">
              Order Placed
            </span>
            <span className="text-xs text-gray-500">Confirmed</span>
          </div>

          <div className="flex-1 h-1 bg-gray-200 mx-4">
            <div className="h-1 bg-green-500 w-1/3"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-500 text-white mb-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">Preparing</span>
            <span className="text-xs text-gray-500">In Progress</span>
          </div>

          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 text-gray-600 mb-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {order.customerInfo.orderType === 'delivery'
                ? 'Out for Delivery'
                : 'Ready for Pickup'}
            </span>
            <span className="text-xs text-gray-500">Pending</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate('/menu')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Order Again
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Back to Home
        </button>
      </div>

      {/* Contact Information */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-2">
          Need help with your order? Contact us at:
        </p>
        <p className="font-medium text-gray-900">
          📞 (555) 123-4567 | 📧 support@pakzaika.com
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
