import { useState } from "react";

const NoteItem = ({
  note,
  deleteNote,
  editingId,
  handleEdit,
  handleCancelEdit,
  handleSave,
}) => {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

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
      <h3>{note.title}</h3>
      <h4>{note.text}</h4>
      <p>Created at: {formatDate()}</p>
      <button onClick={deleteNote}>Удалить</button>
      {editingId !== note.id ? (
        <button onClick={handleEdit}>Редактировать</button>
      ) : (
        <div className="note_edit">
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => handleSave(note.id, { title, text })}>
            Сохранить
          </button>
          <button onClick={handleCancelEdit}>Отменить</button>
        </div>
      )}
    </li>
  );
};

export default NoteItem;
