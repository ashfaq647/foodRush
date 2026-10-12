import { Link } from "react-router-dom";

function FoodCard({
  id,
  name,
  price,
  rating,
  description,
  emoji,
  isAvailable = true,
  onAddToCart,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="h-48 bg-orange-100 flex items-center justify-center">
        <span className="text-7xl">{emoji}</span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-gray-900">
            {name}
          </h3>

          <span className="text-sm text-gray-600 whitespace-nowrap">
            ⭐ {rating}
          </span>
        </div>

        <p className="text-gray-500 mt-2">{description}</p>

        <p
          className={`mt-3 text-sm font-semibold ${
            isAvailable ? "text-green-600" : "text-red-500"
          }`}
        >
          {isAvailable ? "Available" : "Out of Stock"}
        </p>

        <div className="flex items-center justify-between gap-3 mt-4">
          <p className="text-xl font-bold text-orange-500">
            ৳{price}
          </p>

          <button
            type="button"
            disabled={!isAvailable}
            onClick={onAddToCart}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {isAvailable ? "Add to Cart" : "Unavailable"}
          </button>
        </div>

        {id !== undefined && (
          <Link
            to={`/menu/${id}`}
            className="block text-center text-orange-600 font-semibold mt-4 hover:underline"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default FoodCard;