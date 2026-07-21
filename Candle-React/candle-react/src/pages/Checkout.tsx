import { useCart } from '../context/CartContext';
import '../styles/checkout.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zip: '',
  });

  const { cart: cartItems, clearCart } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function handleOrder() {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.country ||
      !formData.zip
    ) {
      alert('Please complete all required fields.');

      return;
    }

    clearCart();

    navigate('/order-success');
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <form className="checkout-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            required
            value={formData.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            required
            value={formData.country}
            onChange={handleChange}
          />

          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            required
            value={formData.zip}
            onChange={handleChange}
          />

          <h3>Payment Method</h3>

          <div className="payment-method">
            <label>
              <input type="radio" name="payment" defaultChecked />
              Card
            </label>

            <label>
              <input type="radio" name="payment" />
              PayPal
            </label>

            <label>
              <input type="radio" name="payment" />
              Cash on Delivery
            </label>
          </div>
        </form>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>{(item.price * item.quantity).toFixed(2)}€</span>
            </div>
          ))}

          <hr />

          <h3>Total: {total.toFixed(2)} €</h3>

          <button className="button" onClick={handleOrder}>
            Place Order
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
