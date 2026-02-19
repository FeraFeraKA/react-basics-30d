import AddNote from '../components/AddNote';
import NoteItem from '../components/NoteItem';
import FilterNote from '../components/FilterNote';
import { useState, useEffect, useRef } from 'react';
import { filterNotes } from '../utils/filterNotes';
import { useDebounce } from '../hooks/useDebounce';

const HomePage = ({
  notes,
  deleteNote,
  addNote,
  editingId,
  handleEdit,
  handleCancelEdit,
  handleSave,
}) => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [sortTags, setSortTags] = useState('');
  const [onlyUpdated, setOnlyUpdated] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const queryRef = useRef(null);

  useEffect(() => {
    handleCancelEdit();
  }, [query, sortTags, sortBy, onlyUpdated, handleCancelEdit]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return;

      if (editingId) {
        handleCancelEdit();
        return;
      }

      if (document.activeElement === queryRef.current) {
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editingId, handleCancelEdit]);

  const debouncedValue = useDebounce(query, 300);

  const filteredNotes = filterNotes(
    notes,
    debouncedValue,
    sortTags,
    sortBy,
    onlyUpdated,
  );

  const handleDelete = (id) => {
    deleteNote(id);
    setDeletingId(null);
  };

  return (
    <div className="container">
      <AddNote addNote={addNote} />
      <FilterNote
        notes={notes}
        query={query}
        queryRef={queryRef}
        setQuery={setQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortTags={sortTags}
        setSortTags={setSortTags}
        onlyUpdated={onlyUpdated}
        setOnlyUpdated={setOnlyUpdated}
      />
      <h3>
        {filteredNotes.length === 0
          ? 'Ничего не найдено'
          : `Показано ${filteredNotes.length} из ${notes.length}`}
      </h3>
      <ul className="notes">
        {filteredNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            editingId={editingId}
            deletingId={deletingId}
            handleEdit={() => handleEdit(note.id)}
            handleCancelEdit={handleCancelEdit}
            handleSave={handleSave}
            deleteNote={() => deleteNote(note.id)}
            handleDelete={handleDelete}
            setDeletingId={setDeletingId}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
