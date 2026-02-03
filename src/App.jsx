import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const initialNotes = () => {
    return [
      {
        title: "Уборка",
        id: 333,
        createdAt: Date.now(),
        tags: [],
      },
      {
        title: "Зал",
        id: 228,
        createdAt: Date.now() + 228,
        tags: [],
      },
      {
        title: "React",
        id: 911,
        createdAt: Date.now() + 911,
        tags: [],
      },
    ];
  };

  const [notes, setNotes] = useState(initialNotes());

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  };

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <div className="page">
      <Header
        title="Моё первое приложение на React"
        userName="Колян"
        toggleLogin={toggleLogin}
        isLoggedIn={isLoggedIn}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage notes={notes} deleteNote={deleteNote} />}
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
