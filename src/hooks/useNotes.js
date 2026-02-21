import { loadNotes, saveNotes, clearStorage } from '../utils/storage';
import { filterNotes } from '../utils/filterNotes';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from './useDebounce';

const now = Date.now();

const initialNotes = [
  {
    title: 'Уборка',
    text: 'Убраться в общаге',
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    tags: ['Dormitory'],
  },
  {
    title: 'Зал',
    text: 'Сходить в зал в четверг',
    id: crypto.randomUUID(),
    createdAt: now + 228,
    updatedAt: now + 228,
    tags: ['Gym'],
  },
  {
    title: 'React',
    text: 'Затронуть кастомные хуки',
    id: crypto.randomUUID(),
    createdAt: now + 911,
    updatedAt: now + 911,
    tags: ['React'],
  },
];

export const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    try {
      return loadNotes(initialNotes);
    } catch (error) {
      console.error('Critical error:', error.message);
      return initialNotes;
    }
  });

  const handleResetAll = useCallback(() => {
    clearStorage();
    setNotes(initialNotes);
    window.location.reload();
  }, []);

  const [filters, setFilters] = useState({
    query: '',
    sortBy: 'asc',
    sortTags: '',
    onlyUpdated: false,
  });

  const [editingData, setEditingData] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const queryRef = useRef(null);
  const debouncedQuery = useDebounce(filters.query, 300);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setEditingData(null);
    setDeletingId(null);
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (editingData) setEditingData(null);
      if (deletingId) setDeletingId(null);
      if (document.activeElement === queryRef.current) {
        updateFilter('query', '');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingData, deletingId, updateFilter]);

  const addNote = (note) => setNotes((prev) => [...prev, note]);

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setDeletingId(null);
  };

  const startEdit = useCallback((note) => {
    setEditingData(note);
  }, []);

  const updateEditingField = useCallback((field, value) => {
    setEditingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSave = (id, updatedFields) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updatedFields, updatedAt: Date.now() }
          : note,
      ),
    );
    setEditingData(null);
  };

  const handleExport = useCallback(() => {
    const jsonString = JSON.stringify(notes, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `notes_export_${new Date().toLocaleDateString()}.json`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [notes]);

  const handleImport = useCallback((file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const importedData = JSON.parse(content);

        if (!Array.isArray(importedData)) {
          console.error('Error: file must contain array of notes.');
          return;
        }

        const validNotes = importedData.filter((note) => {
          return (
            note &&
            typeof note.id === 'string' &&
            typeof note.title === 'string' &&
            typeof note.createdAt === 'number'
          );
        });

        if (validNotes.length > 0) {
          setNotes(validNotes);
        } else {
          console.error('There is no correct notes.');
        }
      } catch (error) {
        console.error('Error: ', error.message);
      }
    };

    reader.readAsText(file);
  }, []);

  const filteredNotes = filterNotes(
    notes,
    debouncedQuery,
    filters.sortTags,
    filters.sortBy,
    filters.onlyUpdated,
  );

  return {
    filteredNotes,
    notes,
    filters,
    editingData,
    deletingId,
    queryRef,
    updateFilter,
    addNote,
    handleDelete,
    startEdit,
    updateEditingField,
    handleSave,
    setEditingData,
    setDeletingId,
    handleExport,
    handleImport,
    handleResetAll,
  };
};
