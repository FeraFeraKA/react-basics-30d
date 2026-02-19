export const validation = (note) => {
  const errors = {};
  const trimmed_title = note.title.trim();
  const trimmed_text = note.text.trim();
  if (trimmed_title.length < 1 || trimmed_title.length > 60)
    errors.title = 'Incorrect title';
  if (trimmed_text.length > 500) errors.text = 'Incorrect text';
  if (note.tags.length > 5) errors.tags = 'Incorrect tags';
  for (const tag of note.tags) {
    const trimmed_tag = tag.trim();
    if (trimmed_tag.length < 1 || trimmed_tag.length > 20)
      errors.tags = 'Incorrect tags';
  }
  return errors;
};
