import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useState } from "react";

const App = () => {
  const notes = [
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Main notes={notes} />
      <Footer />
    </div>
  );
};

export default App;
