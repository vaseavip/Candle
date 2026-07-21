import type { Product } from '../../types/Product';

interface CartItemProps {
  product: Product & { quantity: number };
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

function CartItem({
  product,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: CartItemProps) {
  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} className="cart-item-image" />

      <div className="product-info">
        <h2>{product.name}</h2>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Price:</strong> {product.currency}
          {product.price}
        </p>

        <button
          className="qty-btn"
          onClick={() => decreaseQuantity(product.id)}
        >
          -
        </button>

        <span>{product.quantity}</span>

        <button
          className="qty-btn"
          onClick={() => increaseQuantity(product.id)}
        >
          +
        </button>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(product.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
