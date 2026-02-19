import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const initialNotes = () => {
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    return [
      {
        title: 'Уборка',
        text: 'Убраться в общаге',
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        tags: ['Dormitory'],
      },
      {
        title: 'Зал',
        text: 'Сходить в зал в четверг',
        id: crypto.randomUUID(),
        createdAt: now + 228,
        updatedAt: now + 228,
        tags: ['Gym'],
      },
      {
        title: 'React',
        text: 'Затронуть кастомные хуки',
        id: crypto.randomUUID(),
        createdAt: now + 911,
        updatedAt: now + 911,
        tags: ['React'],
      },
    ];
  };

  const [notes, setNotes] = useState(initialNotes());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [note, ...prevNotes];
    });
  };

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = (id, data) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...data,
              updatedAt: Date.now(),
            }
          : note,
      ),
    );

    setEditingId(null);
  };

  return (
    <div className="page">
      <Header
        title="Моё первое приложение на React"
        toggleLogin={toggleLogin}
        isLoggedIn={isLoggedIn}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                notes={notes}
                deleteNote={deleteNote}
                addNote={addNote}
                editingId={editingId}
                handleEdit={handleEdit}
                handleCancelEdit={handleCancelEdit}
                handleSave={handleSave}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
