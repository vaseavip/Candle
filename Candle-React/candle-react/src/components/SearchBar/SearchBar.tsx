interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search candles..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
