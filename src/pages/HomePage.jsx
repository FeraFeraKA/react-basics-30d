import CreateNoteForm from "../components/CreateNoteForm";
import NoteItem from "../components/NoteItem";
import FilterState from "../components/FilterState";

const HomePage = ({
  notes,
  deleteNote,
  addNote,
  editingId,
  handleEdit,
  handleCancelEdit,
  handleSave,
}) => {
  return (
    <div className="container">
      <CreateNoteForm addNote={addNote} />
      <FilterState />
      <ul className="notes">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            editingId={editingId}
            handleEdit={() => handleEdit(note.id)}
            handleCancelEdit={handleCancelEdit}
            handleSave={handleSave}
            deleteNote={() => deleteNote(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
