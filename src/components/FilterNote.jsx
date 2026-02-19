const FilterState = ({
  notes,
  query,
  queryRef,
  setQuery,
  sortBy,
  setSortBy,
  sortTags,
  setSortTags,
  onlyUpdated,
  setOnlyUpdated,
}) => {
  const allTags = notes.flatMap((note) => note.tags);
  const uniqueTags = [...new Set(allTags)];

  return (
    <>
      <h3>Фильтры и сортировка</h3>
      <div className="notes_filter">
        <div className="search_wrapper">
          <input
            type="text"
            placeholder="Type query..."
            ref={queryRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query !== '' && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
              }}
              className="button_clear"
            >
              ✕
            </button>
          )}
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
          <option value="title_asc">Title ascending</option>
          <option value="title_desc">Title descending</option>
        </select>
        <select value={sortTags} onChange={(e) => setSortTags(e.target.value)}>
          <option value="">All tags</option>
          {uniqueTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={onlyUpdated}
            onChange={(e) => setOnlyUpdated(e.target.checked)}
          />
          <span>Only Updated</span>
        </label>
      </div>
    </>
  );
};

export default FilterState;
