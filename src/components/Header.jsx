const Header = ({ title, userName, toggleLogin, isLoggedIn }) => {
  return (
    <header>
      <div className="container">
        <h1>{title}</h1>
        <div className="header_authorization">
          <p>Привет, {userName}</p>
          <button onClick={toggleLogin}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
