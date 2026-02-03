const NoteItem = ({ note, deleteNote }) => {
  function formatDate() {
    const date = new Date(note.createdAt);
    let day = date.getDay();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return day + "." + month + "." + year + " " + hours + ":" + minutes;
  }

  return (
    <li>
      <h3>{note.title}.</h3>
      <p>Created at: {formatDate()}</p>
      <button onClick={deleteNote}>Удалить</button>
    </li>
  );
};

export default NoteItem;
