import { useEffect } from 'react';

import { useCart } from '../context/CartContext';
import CartItem from '../components/Cart/CartItem';
import '../styles/cart.css';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  useEffect(() => {
    console.log('Cart updated:', cart);
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <h1>Shopping Cart</h1>

        <p>Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      ))}

      <hr />

      <div className="total">
        <h2>Total: {total.toFixed(2)} €</h2>

        <Link to="/checkout" className="button">
          Checkout
        </Link>
      </div>
    </main>
  );
}

export default Cart;
