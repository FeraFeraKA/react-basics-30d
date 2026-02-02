const HomePage = ({ notes }) => {
  return (
    <div className="container">
      <ul className="notes">
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}.</h3>
            <p>Created at: {new Date(note.createdAt).getSeconds()} seconds.</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
