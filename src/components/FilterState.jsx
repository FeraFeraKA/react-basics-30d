import { useState } from "react";

const FilterState = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("desc");
  const [onlyUpdated, setOnlyUpdated] = useState(false);

  return (
    <>
      <h3>Фильтры и сортировка</h3>
      <div className="notes_filter">
        <input
          type="text"
          placeholder="Type query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
          <option value="title_asc">Title ascending</option>
          <option value="title_desc">Title descending</option>
        </select>
        <label>
          <input
            type="checkbox"
            value={onlyUpdated}
            onChange={(e) => setOnlyUpdated(e.target.checked)}
          />
          Only Updated
        </label>
      </div>
    </>
  );
};

export default FilterState;
