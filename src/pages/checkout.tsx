
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [billing, setBilling] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
    country: 'IN'
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const handlePayment = async () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'My Store',
      description: 'Order Payment',
handler: async function (_: any) {
        const orderPayload = {
          billing,
          line_items: cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity
          }))
        };

        const orderRes = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });

        if (orderRes.ok) {
          alert('Order placed successfully!');
          clearCart();
        } else {
          alert('Order failed to be created in WooCommerce.');
        }
      },
      prefill: {
        name: billing.first_name + ' ' + billing.last_name,
        email: billing.email,
        contact: billing.phone
      },
      theme: { color: '#3399cc' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Billing Info</h2>
          <input name="first_name" placeholder="First Name" onChange={handleInput} className="border p-2 w-full mb-2" />
          <input name="last_name" placeholder="Last Name" onChange={handleInput} className="border p-2 w-full mb-2" />
          <input name="email" placeholder="Email" onChange={handleInput} className="border p-2 w-full mb-2" />
          <input name="phone" placeholder="Phone" onChange={handleInput} className="border p-2 w-full mb-2" />
          <input name="address_1" placeholder="Address" onChange={handleInput} className="border p-2 w-full mb-2" />
          <input name="city" placeholder="City" onChange={handleInput} className="border p-2 w-full mb-2" />
          <input name="state" placeholder="State" onChange={handleInput} className="border p-2 w-full mb-2" />
          <input name="postcode" placeholder="Postcode" onChange={handleInput} className="border p-2 w-full mb-2" />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="border p-2 mb-2">
                {item.name} x {item.quantity} = ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold mb-4">Total: ₹{totalAmount.toFixed(2)}</p>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
