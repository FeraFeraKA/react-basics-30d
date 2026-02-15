import { useState } from "react";

const CreateNoteForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    addNote({
      title: trimmedTitle,
      text,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      tags: [],
    });

    setTitle("");
    setText("");
  };

  return (
    <>
      <h3>Создать заметку</h3>
      <form onSubmit={handleSubmit} className="notes_create">
        <input
          type="text"
          placeholder="Title..."
          className="notes_input_title"
          value={title}
          onChange={(e) => setTitle(e.target.value.trim())}
        />
        <input
          type="text"
          placeholder="Text..."
          className="notes_input_text"
          value={text}
          onChange={(e) => setText(e.target.value.trim())}
        />
        <button type="submit" className="notes_add">
          Add
        </button>
      </form>
    </>
  );
};

export default CreateNoteForm;
