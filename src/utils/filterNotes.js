export const filterNotes = (
  notes,
  query,
  sortTags,
  sortBy,
  onlyUpdated,
) => {
  const trimmed = query.trim().toLowerCase();
  let result = [...notes];
  if (trimmed !== '') {
    result = result.filter(
      (note) =>
        note.title.toLowerCase().includes(trimmed) ||
        note.text.toLowerCase().includes(trimmed),
    );
  }
  if (sortTags === '') {
    /* empty */
  } else result = result.filter((note) => note.tags.includes(sortTags));
  if (onlyUpdated)
    result = result.filter((note) => note.createdAt !== note.updatedAt);
  switch (sortBy) {
    case 'asc':
      result.sort((note1, note2) => note1.updatedAt - note2.updatedAt);
      break;
    case 'desc':
      result.sort((note1, note2) => note2.updatedAt - note1.updatedAt);
      break;
    case 'title_asc':
      result.sort((note1, note2) => note1.title.localeCompare(note2.title));
      break;
    case 'title_desc':
      result.sort((note1, note2) => note2.title.localeCompare(note1.title));
      break;
  }
  return result;
};
