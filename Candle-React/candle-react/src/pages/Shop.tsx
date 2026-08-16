import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchBar from '../components/SearchBar/SearchBar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import CategoriesFilter from '../components/CategoriesFilter/CategoriesFilter';
import SortSelect from '../components/SortSelect/SortSelect';

import { getProducts } from '../api/apiClient';
import type { Product } from '../types/Product';

function Shop() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    () => Number(searchParams.get('category')) || 0,
  );
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch {
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 0 || product.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'priceAsc':
          return a.price - b.price;

        case 'priceDesc':
          return b.price - a.price;

        case 'nameAsc':
          return a.name.localeCompare(b.name);

        case 'nameDesc':
          return b.name.localeCompare(a.name);

        default:
          return 0;
      }
    });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <section className="heading">
        <h1>Shop</h1>
        <p>Discover our handmade candles.</p>
      </section>

      <SearchBar search={search} onSearchChange={setSearch} />

      <CategoriesFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <SortSelect sortOption={sortOption} onSortChange={setSortOption} />

      <ProductGrid items={filteredProducts} />
    </main>
  );
}

export default Shop;
