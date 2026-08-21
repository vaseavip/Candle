import type { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { BASE_URL } from '../../api/apiClient';
interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={`${BASE_URL}${product.image}`}
          alt={product.name}
          className="product-card-image"
        />

        <button
          type="button"
          className={`wishlist-toggle ${inWishlist ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label={
            inWishlist ? 'Remove from wishlist' : 'Add to wishlist'
          }
        >
          {inWishlist ? <HiHeart /> : <HiOutlineHeart />}
        </button>
      </div>

      <div className="product-card-body">
        <h3>{product.name}</h3>

        <p>
          Price: {product.price}
          {product.currency}
        </p>

        <div className="product-buttons">
          <button className="button" onClick={() => addToCart(product)}>
            Add to Cart
          </button>

          <Link to={`/product/${product.id}`} className="details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
