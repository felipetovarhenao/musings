import { Icon } from "@iconify/react";
import "./SearchBar.css";

type SearchBarProps = {
  query: string;
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <Icon icon={"mdi:magnify"} className="search-icon" />
        <input type="text" placeholder="Search puzzles..." value={query} onChange={(e) => onSearch(e.target.value)} />
      </div>
    </div>
  );
};

export default SearchBar;
