import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BaseUrl}/order/getOrderById/${id}`,
          { withCredentials: true }
        );
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/orders")}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          View Your Orders
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-10 text-center">
        <p>Order not found</p>
      </div>
    );
  }

  const itemsTotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        <p className="mt-2 font-semibold">Order ID: {order._id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item._id} className="flex items-start gap-4 border-b pb-4">
                <img
                  src={
                    item.product.productImage[0]?.startsWith("https")
                      ? item.product.productImage[0]
                      : `${import.meta.env.VITE_imageUrl}/product/${item.product.productImage[0]}`
                  }
                  alt={item.product.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h3 className="font-medium">{item.product.title}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                  <p className="font-medium">
                    ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span>₹ {itemsTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹ {order.deliveryCharge.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>₹ {order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>{order.shippingAddress}</p>

            <div className="mt-4">
              <h3 className="font-medium">Payment Method</h3>
              <p>
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : order.paymentMethod}
              </p>
              <p className={`font-medium mt-2 ${
                order.paymentStatus === "Completed" ? "text-green-600" : ""
              }`}>
                Payment Status: {order.paymentStatus}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/orders")}
            className="mt-6 w-full py-2 bg-black text-white rounded"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;