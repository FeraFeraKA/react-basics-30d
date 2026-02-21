import { formatDate } from '../utils/formatDate';
import { validation } from '../utils/validation';

const NoteItem = ({
  note,
  editingData,
  deletingId,
  handleEdit,
  handleEditField,
  handleSave,
  handleDelete,
  handleCancel,
  setDeletingId,
}) => {
  if (!note) return null;

  const { id: noteId, title: noteTitle = '', text: noteText = '', tags } = note;

  const noteTags = Array.isArray(tags) ? tags : [];

  const {
    id: editingId,
    title: editableTitle = '',
    text: editableText = '',
  } = editingData ?? {};

  const isEditing = noteId != null && editingId === noteId;

  const validationErrors = isEditing
    ? validation({ title: editableTitle, text: editableText, tags: noteTags })
    : {};

  const isValid = Object.keys(validationErrors).length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (noteId == null) return;
    handleSave(noteId, { title: editableTitle, text: editableText });
  };

  return (
    <li>
      <div className="note_info">
        <h3>{noteTitle}</h3>
        <h4>{noteText}</h4>
        <p>Created at: {formatDate(note)}</p>
        <p>Tags: {noteTags.join(', ')}</p>

        {isEditing &&
          Object.entries(validationErrors).map(([field, message]) => (
            <p key={field} style={{ color: 'red' }}>
              Error: {message}
            </p>
          ))}
      </div>

      <div className="actions">
        {deletingId !== noteId ? (
          <button onClick={() => setDeletingId(noteId)}>Delete</button>
        ) : (
          <div className="confirm">
            <span>Remove?</span>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setDeletingId(null)}>No</button>
          </div>
        )}

        {!isEditing ? (
          <button onClick={handleEdit}>Edit</button>
        ) : (
          <form onSubmit={onSubmit} className="note_edit">
            <input
              type="text"
              placeholder="Title..."
              value={editableTitle}
              onChange={(e) => handleEditField('title', e.target.value)}
            />
            <input
              type="text"
              placeholder="Text..."
              value={editableText}
              onChange={(e) => handleEditField('text', e.target.value)}
            />
            <button type="submit" disabled={!isValid}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </li>
  );
};

export default NoteItem;
