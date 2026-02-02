import { NavLink } from "react-router-dom";

const Header = ({ title, userName, toggleLogin, isLoggedIn }) => {
  return (
    <header>
      <div className="container">
        <div className="header_info">
          <h1>{title}</h1>
          <p>Привет, {userName}</p>
        </div>
        <div className="authorization_links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          {!isLoggedIn && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Profile
            </NavLink>
          )}
          <button onClick={toggleLogin}>Toggle Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
