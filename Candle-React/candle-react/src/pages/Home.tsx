import { useEffect, useState } from 'react';

import Hero from '../components/Hero/Hero';
import CategoriesPreview from '../components/CategoriesPreview/CategoriesPreview';
import Promo from '../components/Promo/Promo';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { getProducts } from '../api/apiClient';
import type { Product } from '../types/Product';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setFeaturedProducts(data.slice(0, 4));
        setError(null);
      } catch {
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      <Hero />
      <CategoriesPreview />
      <Promo />

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <ProductGrid title="Best selling products" items={featuredProducts} />
      )}
    </>
  );
}

export default Home;
