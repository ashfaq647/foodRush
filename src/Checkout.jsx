import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Checkout({ onPlaceOrder, onClearCart, cart, subtotal }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  // Update form state
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // Save complete order information
  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {

           
    toast.error("Your Cart is Empty!", {
    description: "Go to the Menu."

    })
   
      return;
    }

    const orderId = Date.now().toString();

    onPlaceOrder({
      id: orderId,
      customer: { ...formData },
      items: [...cart],
      total: subtotal,
      orderDate: new Date().toISOString(),
    });


   //clear the cart
    onClearCart()

   
        
    toast.success("Order placed successfully!", {
    description: "Your order has been confirmed."

    });

    // Reset checkout form after successful order placement
    setFormData({
      name: "",
      phone: "",
      address: "",
      payment: "cod",
    });


    
      navigate(`/invoice/${orderId}`)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Checkout
      </h1>

      <p className="text-gray-500 mt-2">
        Enter your delivery information to place your order.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 mt-8 space-y-5"
      >
        {/* Customer Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            pattern="01[0-9]{9}"
            title="Enter a valid 11-digit Bangladeshi phone number"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Delivery Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House, road, area, city"
            rows={3}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Payment Method
          </label>

          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="online">
              Online Payment (Demo Only)
            </option>
          </select>
        </div>

        {/* Order Total */}
        <div className="flex justify-between border-none pt-4">
          <span className="font-semibold text-gray-900">
            Order Total
          </span>

          <span className="text-xl font-bold text-orange-500">
            ৳{subtotal}
          </span>
        </div>

        {/* Submit Order */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-colors"
        >
          Place Order
        </button>

        <Link
          to="/cart"
          className="block text-center text-orange-600 font-medium hover:underline"
        >
          Back to Cart
        </Link>
      </form>
    </main>
  );
}

export default Checkout;
