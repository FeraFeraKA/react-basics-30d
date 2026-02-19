export const parseTags = (tags) => {
  return tags
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t !== '')
    .map((t) => t[0].toUpperCase() + t.slice(1));
};
