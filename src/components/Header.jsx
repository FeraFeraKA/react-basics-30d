const Header = ({ title, userName, toggleLogin, isLoggedIn }) => {
  return (
    <header>
      <div>
        <h1>{title}</h1>
        <p>Привет, {userName}</p>
        <button onClick={toggleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>
      </div>
    </header>
  );
};

export default Header;
