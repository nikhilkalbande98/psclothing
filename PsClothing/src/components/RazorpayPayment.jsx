import Razorpay from 'razorpay';
import React, { useState } from 'react';
// import Razorpay from 'razorpay';

const RazorpayPayment = () => {
  const [orderId, setOrderId] = useState('');

  const createOrder = () => {
    const razorpay = new Razorpay({
      key_id: 'YOUR_KEY_ID', // Replace with your actual Razorpay API key
      key_secret: 'YOUR_KEY_SECRET', // Replace with your actual Razorpay API key secret
    });

    const options = {
      amount: 1000, // Amount in paisa (e.g., 1000 paisa = 10 INR)
      currency: 'INR', // Currency code
      receipt: 'order_rcptid_11', // Replace with your unique order receipt ID
    };

    razorpay.orders.create(options, (order) => {
      setOrderId(order.id);
    });
  };

  const handlePayment = () => {
    const options = {
      key: 'YOUR_KEY_ID', // Replace with your actual Razorpay API key
      amount: 1000, // Amount in paisa
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Sample Description',
      order_id: orderId,
      handler: (response) => {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <button onClick={createOrder}>Create Order</button>
      {orderId && <button onClick={handlePayment}>Pay</button>}
    </div>
  );
};

export default RazorpayPayment;
