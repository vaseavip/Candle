import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/checkout.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postCart } from '../api/apiClient';

function Checkout() {
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
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

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOrder() {
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

    setSubmitError(null);
    setSubmitting(true);

    try {
      await postCart({
        items: cart.map(({ id, name, price, quantity }) => ({
          id,
          name,
          price,
          quantity,
        })),
        total,
        shipping: formData,
      });

      clearCart();
      navigate('/order-success');
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="checkout-page">
        <h1>Checkout</h1>

        <p>You must be logged in to complete your order.</p>

        <Link to="/login" className="button">
          Login
        </Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Checkout</h1>

        <p>Your cart is empty.</p>

        <Link to="/shop" className="button">
          Continue Shopping
        </Link>
      </main>
    );
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

          {submitError && <p className="form-error">{submitError}</p>}

          <button className="button" onClick={handleOrder} disabled={submitting}>
            {submitting ? 'Processing...' : 'Pay'}
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
