import { Link } from 'react-router-dom';

import ProductGrid from '../components/ProductGrid/ProductGrid';
import { useWishlist } from '../context/WishlistContext';

function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <main className="container">
        <h1>Wishlist</h1>

        <p>Your wishlist is currently empty.</p>

        <Link to="/shop" className="button">
          Browse Shop
        </Link>
      </main>
    );
  }

  return (
    <main>
      <section className="heading">
        <h1>Wishlist</h1>
        <p>Products you've saved for later.</p>
      </section>

      <ProductGrid items={wishlist} />
    </main>
  );
}

export default Wishlist;
