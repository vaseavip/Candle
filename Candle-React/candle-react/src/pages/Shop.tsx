import { useState } from 'react';

import SearchBar from '../components/SearchBar/SearchBar';
import ProductGrid from '../components/ProductGrid/ProductGrid';

import { products } from '../data/products';
import CategoriesFilter from '../components/CategoriesFilter/CategoriesFilter';
import SortSelect from '../components/SortSelect/SortSelect';

function Shop() {
  const [search, setSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sortOption, setSortOption] = useState('default');
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
  return (
    <main className="shop-page">
      <section className="shop-header">
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
