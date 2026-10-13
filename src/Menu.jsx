import { useState } from "react";
import FoodCard from "./FoodCard";
import foods from "./data";

function Menu({ onAddToCart }) {

  //search Box
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Our Menu
        </h1>

        <p className="text-gray-600 mt-3">
          Discover delicious meals made just for you.
        </p>
      </section>

      <div className="max-w-xl mx-auto mt-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search your favorite food..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <section className="flex flex-wrap justify-center gap-3 mt-8">
        {["All", "Burger", "Pizza", "Chicken", "Snacks", "Drinks"].map(
          (category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-100"
              }`}
            >
              {category}
            </button>
          )
        )}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
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
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No food found. Try another search.
          </p>
        )}
      </section>
    </main>
  );
}

export default Menu;