import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/order/createOrder`,
        {
          shippingAddress,
          paymentMethod,
        },
        { withCredentials: true }
      );

      navigate(`/order/${data._id}`);
    } catch (err) {
      console.error("Checkout failed:", err);
      setError(
        err.response?.data?.message || "Checkout failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
  try {
    // 1. Create local DB order
    const { data: newOrder } = await axios.post(
      `${import.meta.env.VITE_BaseUrl}/order/createOrder`,
      {
        shippingAddress,
        paymentMethod,
      },
      { withCredentials: true }
    );

    // 2. Create Razorpay payment order
    const { data: razorpayOrder } = await axios.post(
      `${import.meta.env.VITE_BaseUrl}/order/razorpay`,
      { totalAmount: newOrder.total },
      { withCredentials: true }
    );

    // 3. Open Razorpay checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEYID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Nike Store",
      description: "Test Payment",
      order_id: razorpayOrder.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log("Razorpay Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);

        // Redirect to order details page or confirmation
        navigate(`/order/${newOrder._id}`);
      },
      prefill: {
        name: user?.firstname || "Test User",
        email: user?.email || "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Order/payment failed:", err);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <textarea
            className="w-full p-3 border rounded"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
            placeholder="Enter your full shipping address"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="h-5 w-5"
              />
              <span>Cash on Delivery (COD)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={() => setPaymentMethod("Card")}
                className="h-5 w-5"
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={() => setPaymentMethod("UPI")}
                className="h-5 w-5"
              />
              <span>UPI</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded-full font-semibold disabled:opacity-70"
           onClick={handlePlaceOrder}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;