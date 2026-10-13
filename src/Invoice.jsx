import { useParams, Link } from "react-router-dom";

function Invoice({ order }) {
  const { id } = useParams();

  // Order na thakle ba URL er id mile na gele
  if (!order || String(order.id) !== id) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl">🧾</div>

        <h1 className="text-3xl font-bold text-gray-900 mt-5">
          Invoice Not Found
        </h1>

        <p className="text-gray-500 mt-3">
          We couldn't find an order with this invoice number.
        </p>

        <Link
          to="/menu"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold mt-8 hover:bg-orange-600 transition-colors"
        >
          Back to Menu
        </Link>
      </main>
    );
  }

  

  const paymentLabel =
    order.customer.payment === "cod"
      ? "Cash on Delivery"
      : "Online Payment (Demo)";

  const orderDate = new Date(order.orderDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Print korar somoy navbar lukano */}
      <style>{`@media print { header { display: none; } }`}</style>

      {/* Success message */}
      <div className="text-center mb-8 print:hidden">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">✅</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mt-5">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for ordering with FoodRush.
        </p>
      </div>

      {/* Invoice Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-gray-300">
        {/* Top Bar */}
        <div className="bg-orange-500 text-white px-8 py-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold">FoodRush</h2>
            <p className="text-orange-100 text-sm mt-1">
              Delicious food, delivered fast
            </p>
          </div>

          <div className="text-right">
            <p className="text-orange-100 text-sm">Invoice</p>
            <p className="text-xl font-bold">#{order.id}</p>
          </div>
        </div>

        <div className="p-8">
          {/* Order Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Billed To</p>
              <p className="font-bold text-gray-900 mt-1">
                {order.customer.name}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {order.customer.phone}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {order.customer.address}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-bold text-gray-900 mt-1">{orderDate}</p>

              <p className="text-sm text-gray-500 mt-4">Payment Method</p>
              <p className="font-bold text-gray-900 mt-1">
                {paymentLabel}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-100 text-sm text-gray-500">
                  <th className="pb-3 font-semibold">Item</th>
                  <th className="pb-3 font-semibold text-center">Qty</th>
                  <th className="pb-3 font-semibold text-right">Price</th>
                  <th className="pb-3 font-semibold text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <span className="font-semibold text-gray-900">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 text-center text-gray-700">
                      {item.quantity}
                    </td>

                    <td className="py-4 text-right text-gray-700">
                      ৳{item.price}
                    </td>

                    <td className="py-4 text-right font-bold text-gray-900">
                      ৳{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-8 flex justify-end">
            <div className="w-full sm:w-72 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>৳{order.total}</span>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-orange-500">
                  ৳{order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-400 text-sm mt-10">
            Thank you for choosing FoodRush! 🍔
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
        >
          Print Invoice
        </button>

        <Link
          to="/menu"
          className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default Invoice;