const Main = ({ notes }) => {
  return (
    <main>
      <div>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {note.title}. Created at: {new Date(note.createdAt).getSeconds()}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Main;
