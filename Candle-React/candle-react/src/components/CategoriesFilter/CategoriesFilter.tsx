import { categories } from '../../data/categories';

interface CategoriesFilterProps {
  selectedCategory: number;
  onSelectCategory: (categoryId: number) => void;
}

function CategoriesFilter({
  selectedCategory,
  onSelectCategory,
}: CategoriesFilterProps) {
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
