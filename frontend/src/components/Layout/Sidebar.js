import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="user-profile">
        <img
          src="path-to-user-avatar"
          alt="User Avatar"
          className="profile-avatar"
        />
        <p>
          Welcome back,
          <br />
          {user.name}
        </p>
      </div>
      <div className="budget-info">
        <p>${user.budget}</p>
        <p>Monthly budget</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
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
          {isAuthenticated && (
            <li>
              <Link to="/" onClick={logout}>
                Sign-out
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
