import { Link } from 'react-router-dom';
import '../styles/order-success.css';

function OrderSuccess() {
  return (
    <main className="order-success">
      <h1>🎉 Thank you!</h1>

      <p>Your order has been placed successfully.</p>

      <Link to="/" className="button">
        Back to Home
      </Link>
    </main>
  );
}

export default OrderSuccess;
