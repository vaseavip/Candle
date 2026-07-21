import type { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>
        Price: {product.price}
        {product.currency}
      </p>

      <div className="product-buttons">
        <button className="button" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
      <div>
        <Link to={`/product/${product.id}`} className="details-btn">
          View Details
        </Link>
      </div>

      <div className="cart-message"></div>
    </div>
  );
}

export default ProductCard;
