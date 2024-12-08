import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ role }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          EventManager
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {!role ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login/Register
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
