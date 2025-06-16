import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BaseUrl}/order/getUserOrders`,
          { withCredentials: true }
        );
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="py-10 text-center">Loading your orders...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">You have no orders yet</h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Order #{order._id.substring(order._id.length - 6).toUpperCase()}
                </p>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  ₹ {order.total.toLocaleString("en-IN")}
                </p>
                <p
                  className={`text-sm ${
                    order.orderStatus === "Delivered"
                      ? "text-green-600"
                      : order.orderStatus === "Cancelled"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {order.orderStatus}
                </p>
              </div>
            </div>

            <div className="p-4">
              {order.items.slice(0, 2).map((item) => (
                <div key={item._id} className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      item.product.productImage[0]?.startsWith("https")
                        ? item.product.productImage[0]
                        : `${import.meta.env.VITE_imageUrl}/product/${item.product.productImage[0]}`
                    }
                    alt={item.product.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                    <p className="text-sm">
                      ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}

              {order.items.length > 2 && (
                <p className="text-sm text-gray-500 mt-2">
                  + {order.items.length - 2} more items
                </p>
              )}

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
                >
                  View Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;