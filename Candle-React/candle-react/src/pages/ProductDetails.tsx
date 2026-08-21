import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import '../styles/productdetails.css';
import { getProduct, BASE_URL } from '../api/apiClient';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from '../components/StarRating/StarRating';
import type { Product } from '../types/Product';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(Number(id));
        setProduct(data);
        setError(null);
      } catch {
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <main className="product-details">
      <div className="product-details-image-card">
        <img src={`${BASE_URL}${product.image}`} alt={product.name} />
      </div>

      <div className="product-details-card">
        <h1>{product.name}</h1>

        {product.rating !== undefined && (
          <StarRating
            rating={product.rating}
            reviewsCount={product.reviewsCount}
          />
        )}

        <h2 className="product-details-price">
          {product.price}
          {product.currency}
        </h2>

        <p className="product-details-category">
          <strong>Category:</strong> {product.category}
        </p>

        <p className="product-details-description">{product.description}</p>

        {product.characteristics && (
          <div className="product-characteristics">
            <h3>Characteristics</h3>

            <p>
              <strong>Material:</strong> {product.characteristics.material}
            </p>

            <p>
              <strong>Fuse:</strong> {product.characteristics.fuseType}
            </p>

            <p>
              <strong>Weight:</strong> {product.characteristics.weight}
            </p>

            <p>
              <strong>Height:</strong> {product.characteristics.height}
            </p>

            <p>
              <strong>Burning Time:</strong>{' '}
              {product.characteristics.burningTime}
            </p>

            <p>
              <strong>Color:</strong> {product.characteristics.color}
            </p>

            {product.characteristics.flavor && (
              <p>
                <strong>Flavors:</strong>{' '}
                {product.characteristics.flavor.join(', ')}
              </p>
            )}
          </div>
        )}

        <div className="product-details-actions">
          <button className="button" onClick={() => addToCart(product)}>
            Add to Cart
          </button>

          <button
            type="button"
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={() => toggleWishlist(product)}
          >
            {inWishlist ? <HiHeart /> : <HiOutlineHeart />}
            {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
