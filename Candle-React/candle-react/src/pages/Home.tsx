import Hero from '../components/Hero/Hero';
import CategoriesPreview from '../components/CategoriesPreview/CategoriesPreview';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { products } from '../data/products';
function Home() {
  const featuredProducts = products.filter((product) =>
    [5, 6, 7, 8].includes(product.id),
  );

  return (
    <>
      <Hero />
      <CategoriesPreview />
      <ProductGrid title="Best selling products" items={featuredProducts} />
    </>
  );
}

export default Home;
