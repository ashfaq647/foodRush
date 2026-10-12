import { Link } from "react-router-dom";

function Cart({ cart, onDecrease, onRemove, onIncrease }) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-6 py-16 text-center">
          <div className="w-28 h-28 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-6xl">🛒</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-6">
            Your Cart Is Empty
          </h1>

          <p className="text-gray-500 mt-3 max-w-sm mx-auto">
            Looks like you haven't added any food yet. Explore our menu and find
            something delicious.
          </p>

          <Link
            to="/menu"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold mt-8 shadow-sm hover:bg-orange-600 transition-colors"
          >
            Explore Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Heading */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>

          <p className="text-gray-500 mt-2">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <Link
          to="/menu"
          className="text-orange-600 font-semibold hover:underline"
        >
          ← Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 items-start">
        {/* Cart Items */}
        <section className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-5xl">{item.emoji}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg text-gray-900 truncate">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">৳{item.price} each</p>

                {/* Quantity Controls: Decrease, Increase, and Remove Item */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => onDecrease(item.id)}
                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-orange-50"
                  >
                    −
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => onIncrease(item.id)}
                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-orange-50"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="text-sm text-red-500 hover:text-red-700 ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>

                <p className="text-xl font-bold text-orange-500 whitespace-nowrap">
                  ৳{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Order Summary */}
        <aside className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

          <div className="mt-5 space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-5 pt-5 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-orange-500">
              ৳{subtotal}
            </span>
          </div>

          <Link
            to="/checkout"
            className="block text-center bg-orange-500 text-white py-3 rounded-xl font-semibold mt-6 shadow-sm hover:bg-orange-600 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
