import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <h2>Product not found.</h2>;
  }

  return (
    <main className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-content">
        <h1>{product.name}</h1>

        <h2>
          {product.price}
          {product.currency}
        </h2>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>{product.description}</p>

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

        <button className="button" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </main>
  );
}

export default ProductDetails;
