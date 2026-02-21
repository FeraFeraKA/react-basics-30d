const STORAGE_KEY = 'notes_app_data';
const CURRENT_VERSION = 1;

const isValidNote = (note) =>
  note &&
  typeof note === 'object' &&
  typeof note.id === 'string' &&
  typeof note.title === 'string' &&
  typeof note.text === 'string' &&
  typeof note.createdAt === 'number' &&
  Number.isFinite(note.createdAt) &&
  typeof note.updatedAt === 'number' &&
  Number.isFinite(note.updatedAt) &&
  Array.isArray(note.tags) &&
  note.tags.every((tag) => typeof tag === 'string');

export const loadNotes = (initialNotes) => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return initialNotes;

    const parsed = JSON.parse(rawData);
    if (parsed.version !== CURRENT_VERSION) {
      return initialNotes;
    }

    if (!Array.isArray(parsed.notes)) return initialNotes;
    return parsed.notes.filter(isValidNote);
  } catch (error) {
    console.error('Failed to load notes from localStorage:', error.message);
    return initialNotes;
  }
};

export const saveNotes = (notes) => {
  const dataToSave = {
    version: CURRENT_VERSION,
    notes: notes,
    lastSaved: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
};

export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
