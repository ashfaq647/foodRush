import { Toaster } from "sonner";
import { toast } from "sonner";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GlassScroll } from 'glass-scroll'

import Header from "./Header";
import Home from "./Home";
import Menu from "./Menu";
import FoodDetails from "./FoodDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Invoice from "./Invoice";

function App() {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  // Calculate subtotal in one place
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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

    toast.success("Added to cart!", {
    description: `${food.name} has been added to your cart.`,
  });


  }

  // Clear cart after successful order placement
  function handleClearCart() {
    setCart([]);
  }

  // Increase quantity
  function handleIncreaseQuantity(foodId) {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === foodId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease quantity and remove item if quantity reaches 0
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

  // Remove item completely
  function handleRemoveFromCart(foodId) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== foodId)
    );
  // Order save koro ar cart khali koro
  function handlePlaceOrder(newOrder) {
    setOrder(newOrder);
    setCart([]);
  }
  }

  return (
    <>
    <Toaster position="top-right" richColors />

      <Header
        cartCount={cart.reduce(
          (total, item) => total + item.quantity,
          0
        )}
      />
        <GlassScroll />
      <Routes>
      
        <Route
          path="/"
          element={<Home onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/menu"
          element={<Menu onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/menu/:id"
          element={<FoodDetails onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              subtotal={subtotal}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
              onRemove={handleRemoveFromCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              onPlaceOrder={setOrder}
              onClearCart={handleClearCart}
              cart={cart}
              subtotal={subtotal}
            />
          }
        />

        <Route
          path="/invoice/:id"
          element={<Invoice 
          order={order}
          subtotal={subtotal}
          
           />}
        />
      </Routes>
    </>
  );
}

export default App;
