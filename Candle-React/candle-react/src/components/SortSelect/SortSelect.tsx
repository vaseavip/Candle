interface SortSelectProps {
  sortOption: string;
  onSortChange: (value: string) => void;
}

function SortSelect({ sortOption, onSortChange }: SortSelectProps) {
  return (
    <div className="sort-select">
      <select value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
        <option value="default">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="nameAsc">Name A-Z</option>
        <option value="nameDesc">Name Z-A</option>
      </select>
    </div>
  );
}

export default SortSelect;
