import { getUniqueTags } from '../utils/getUniqueTags';

const FilterState = ({ notes, filters, updateFilter, queryRef }) => {
  const uniqueTags = getUniqueTags(notes);

  return (
    <>
      <h3>Фильтры и сортировка</h3>
      <div className="notes_filter">
        <div className="search_wrapper">
          <input
            type="text"
            placeholder="Type query..."
            ref={queryRef}
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
          />
          {filters.query !== '' && (
            <button
              type="button"
              onClick={() => {
                updateFilter('query', '');
              }}
              className="button_clear"
            >
              ✕
            </button>
          )}
        </div>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
          <option value="title_asc">Title ascending</option>
          <option value="title_desc">Title descending</option>
        </select>
        <select
          value={filters.sortTags}
          onChange={(e) => updateFilter('sortTags', e.target.value)}
        >
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
            checked={filters.onlyUpdated}
            onChange={(e) => updateFilter('onlyUpdated',e.target.checked)}
          />
          <span>Only Updated</span>
        </label>
      </div>
    </>
  );
};

export default FilterState;
