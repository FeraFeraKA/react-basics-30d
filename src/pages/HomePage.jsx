import AddNote from '../components/AddNote';
import NoteItem from '../components/NoteItem';
import FilterNote from '../components/FilterNote';
import DataActions from '../components/DataActions';

import { useNotes } from '../hooks/useNotes';

const HomePage = () => {
  const {
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
  } = useNotes();

  return (
    <div className="container">
      <AddNote addNote={addNote} />
      <FilterNote
        notes={notes}
        filters={filters}
        updateFilter={updateFilter}
        queryRef={queryRef}
      />
      <div className="notes_info">
        <h3>
          {filteredNotes.length === 0
            ? 'Ничего не найдено'
            : `Показано ${filteredNotes.length} из ${notes.length}`}
        </h3>
        <DataActions
          handleExport={handleExport}
          handleImport={handleImport}
          handleResetAll={handleResetAll}
        />
      </div>
      <ul className="notes">
        {filteredNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            editingData={editingData}
            deletingId={deletingId}
            handleEdit={() => startEdit(note)}
            handleEditField={updateEditingField}
            handleSave={handleSave}
            handleDelete={() => handleDelete(note.id)}
            handleCancel={() => setEditingData(null)}
            setDeletingId={setDeletingId}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
