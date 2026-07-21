import ProductCard from '../ProductCard/ProductCard';
import { products } from '../../data/products';
import type { Product } from '../../types/Product';

interface ProductGridProps {
  items?: Product[];
  title?: string;
}

function ProductGrid({ items = products, title }: ProductGridProps) {
  return (
    <section>
      {title && (
        <div className="text">
          <h2>{title}</h2>
        </div>
      )}

      <div className="product-grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
