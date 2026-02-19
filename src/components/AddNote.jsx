import { useState, useRef } from 'react';
import { parseTags } from '../utils/parseTags';
import { validation } from '../utils/validation';

const CreateNoteForm = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');

  const titleRef = useRef(null);

  const parsedTags = parseTags(tags);

  const validationErrors = validation({
    title,
    text,
    tags: parsedTags,
  });

  const isValid = Object.keys(validationErrors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    addNote({
      title,
      text,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: parsedTags,
    });

    setTitle('');
    setText('');
    setTags('');

    titleRef.current?.focus();
  };

  return (
    <>
      <h3>Создать заметку</h3>
      <form onSubmit={handleSubmit} className="notes_create">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          ref={titleRef}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit" disabled={!isValid}>
          Add
        </button>
      </form>
    </>
  );
};

export default CreateNoteForm;
