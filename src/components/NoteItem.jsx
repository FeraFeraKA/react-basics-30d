import { useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { validation } from '../utils/validation';

const NoteItem = ({
  note,
  editingId,
  deletingId,
  handleEdit,
  handleCancelEdit,
  handleSave,
  handleDelete,
  setDeletingId,
}) => {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave(note.id, { title, text });
  };

  const onCancel = () => {
    setTitle(note.title);
    setText(note.text);
    handleCancelEdit();
  };

  const validationErrors = validation({
    title,
    text,
    tags: note.tags,
  });

  const isValid = Object.keys(validationErrors).length === 0;

  return (
    <li>
      <div className="note_info">
        <h3>{note.title}</h3>
        <h4>{note.text}</h4>
        <p>Created at: {formatDate(note)}</p>
        <p>Tags: {note.tags.join(', ')}</p>
        {Object.entries(validationErrors).map(([field, message]) => (
          <p key={field}>Error: {message}</p>
        ))}
      </div>
      {deletingId !== note.id ? (
        <button onClick={() => setDeletingId(note.id)}>Удалить</button>
      ) : (
        <div className="confirm">
          <span>Удалить?</span>
          <button onClick={() => handleDelete(note.id)}>Да</button>
          <button onClick={() => setDeletingId(null)}>Нет</button>
        </div>
      )}

      {editingId !== note.id ? (
        <button onClick={handleEdit}>Редактировать</button>
      ) : (
        <form onSubmit={onSubmit} className="note_edit">
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
          <button type="submit" disabled={!isValid}>
            Сохранить
          </button>
          <button type="button" onClick={onCancel}>
            Отменить
          </button>
        </form>
      )}
    </li>
  );
};

export default NoteItem;
