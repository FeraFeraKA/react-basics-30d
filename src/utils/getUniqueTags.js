export const getUniqueTags = (notes) => {
  const allTags = notes.flatMap((note) => note.tags);
  return [...new Set(allTags)];
};
