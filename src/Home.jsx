import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";
import foods from "./data";

function Home({ onAddToCart }) {
  const featuredFoods = [...foods]
    .filter((food) => food.isAvailable)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <main>

      {/* Hero Section */}
      <section className="bg-orange-50">
        <div className="max-w-7xl mx-auto px-6 py-20 flex items-center justify-between">

          {/* Left Content */}
          <div className="max-w-xl">
            <p className="text-orange-500 font-semibold mb-3">
              Delicious food, delivered fast
            </p>

            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Your favorite food,
              <span className="text-orange-500"> delivered to your door.</span>
            </h1>

            <p className="text-gray-600 mt-5 text-lg">
              Order delicious meals from your favorite restaurants
              and enjoy fast delivery right at your doorstep.
            </p>

            <Link
              to="/menu"
              className="inline-block mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Explore Menu
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:block">
            <div className="w-80 h-80 bg-orange-200 rounded-full flex items-center justify-center">
              <span className="text-6xl md:text-7xl animate-bounce">🍔</span>
            </div>
          </div>

        </div>
      </section>

      {/* Popular Foods */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Popular Foods
        </h2>

        <p className="text-gray-600 text-center mt-3">
          Discover some of our customers' favorite meals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {featuredFoods.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              rating={food.rating}
              description={food.description}
              emoji={food.emoji}
              isAvailable={food.isAvailable}
              onAddToCart={() => onAddToCart(food)}
            />
          ))}
        </div>
      </section>

      {/* Why FoodRush */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why Choose FoodRush?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10">

          <div className="text-center p-6">
            <div className="text-4xl">⚡</div>
            <h3 className="text-xl font-semibold mt-4">
              Fast Delivery
            </h3>
            <p className="text-gray-600 mt-2">
              Get your favorite meals delivered quickly.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl">🍕</div>
            <h3 className="text-xl font-semibold mt-4">
              Fresh Food
            </h3>
            <p className="text-gray-600 mt-2">
              Enjoy delicious and freshly prepared food.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl">💳</div>
            <h3 className="text-xl font-semibold mt-4">
              Easy Ordering
            </h3>
            <p className="text-gray-600 mt-2">
              Simple and convenient ordering experience.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <h2 className="text-3xl font-bold text-white">
            Hungry? Let's get you something delicious.
          </h2>

          <p className="text-gray-300 mt-3">
            Explore our menu and order your favorite food today.
          </p>

          <Link
            to="/menu"
            className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
          >
            Order Now
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Home;