import NoteItem from "../components/NoteItem";

const HomePage = ({ notes, deleteNote }) => {
  return (
    <div className="container">
      <ul className="notes">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            deleteNote={() => deleteNote(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
