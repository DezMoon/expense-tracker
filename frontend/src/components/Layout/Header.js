import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Zence</Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/investments">Investments</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/wallet">Wallet</Link>
            </li>
          </ul>
        </nav>
        {isAuthenticated && (
          <div className="user-info">
            <img
              src="path-to-user-avatar"
              alt="User Avatar"
              className="user-avatar"
            />
            <button onClick={handleLogout} className="logout-button">
              Sign-out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
