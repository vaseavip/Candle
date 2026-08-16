import { useEffect, useState } from 'react';

import { getCategories } from '../../api/apiClient';
import type { Category } from '../../types/Category';

interface CategoriesFilterProps {
  selectedCategory: number;
  onSelectCategory: (categoryId: number) => void;
}

function CategoriesFilter({
  selectedCategory,
  onSelectCategory,
}: CategoriesFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    }

    loadCategories();
  }, []);

  return (
    <div className="categories-filter">
      <button
        className={selectedCategory === 0 ? 'active' : ''}
        onClick={() => onSelectCategory(0)}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          className={selectedCategory === category.id ? 'active' : ''}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoriesFilter;
