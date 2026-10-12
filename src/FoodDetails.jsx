import { useParams, Link } from "react-router-dom";
import foods from "./data";

function FoodDetails({ onAddToCart }) {
  const { id } = useParams();

  const food = foods.find((item) => item.id === Number(id));

  if (!food) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Food Not Found
        </h1>

        <Link
          to="/menu"
          className="inline-block mt-6 text-orange-600 hover:underline"
        >
          Back to Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 mt-30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* Food Image */}
        <div className="bg-orange-100 rounded-3xl h-80 md:h-96 flex items-center justify-center">
          <span className="text-9xl">{food.emoji}</span>
        </div>

        {/* Food Information */}
        <div>
          <p className="text-orange-500 font-semibold">
            {food.category}
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-3">
            {food.name}
          </h1>

          <p className="text-gray-600 mt-4 leading-7">
            {food.description}
          </p>

          <div className="flex items-center gap-3 mt-5">
            <span className="text-yellow-500">⭐ {food.rating}</span>
            <span className="text-gray-400">|</span>

            <span
              className={
                food.isAvailable ? "text-green-600" : "text-red-500"
              }
            >
              {food.isAvailable ? "Available" : "Out of Stock"}
            </span>
          </div>

          <p className="text-3xl font-bold text-orange-500 mt-6">
            ৳{food.price}
          </p>

          <button
            type="button"
            disabled={!food.isAvailable}
            onClick={() => onAddToCart(food)}
            className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {food.isAvailable ? "Add to Cart" : "Unavailable"}
          </button>

          <div>
            <Link
              to="/menu"
              className="inline-block mt-5 text-orange-600 hover:underline"
            >
              ← Back to Menu
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export default FoodDetails;