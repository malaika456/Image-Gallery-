import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Image Gallery
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          {isAuthenticated() ? (
            <>
              <li className="nav-item">
                <Link to="/gallery" className="nav-links">My Gallery</Link>
              </li>
              <li className="nav-item">
                <Link to="/upload" className="nav-links">Upload</Link>
              </li>
              <li className="nav-item">
                <span className="nav-links">Welcome, {user.username}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-links">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;