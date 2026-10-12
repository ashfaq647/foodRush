import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Menu from "./Menu";
import FoodDetails from "./FoodDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Invoice from "./Invoice";

function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(food) {
    setCart((previousCart) => {
      const existingFood = previousCart.find(
        (item) => item.id === food.id
      );

      if (existingFood) {
        return previousCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...food, quantity: 1 }];
    });
  }


    // Increase the quantity of a food item in the cart
  function handleIncreaseQuantity(foodId) {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === foodId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease the quantity; remove the item if quantity becomes 0
  function handleDecreaseQuantity(foodId) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === foodId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove a food item completely from the cart
  function handleRemoveFromCart(foodId) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== foodId)
    );
  }

  return (
    <>
      <Header cartCount={cart.reduce((n, item) => n + item.quantity, 0)} />

      <Routes>
        <Route
          path="/"
          element={
          
          <Home 
          
          onAddToCart={handleAddToCart} 

          />}
        />

        <Route
          path="/menu"
          element={
            <Menu 

            onAddToCart={handleAddToCart} 

            />
          }
        />

        <Route
          path="/menu/:id"
          element={
            <FoodDetails 

            onAddToCart={handleAddToCart} 

            />
          }
        />

        <Route
          path="/cart"
          element={

          <Cart 
          cart={cart}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
          onRemove={handleRemoveFromCart}

          />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/invoice/:id" element={<Invoice />} />
      </Routes>

    </>
  );
}

export default App;