import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Image Gallery</h1>
      <p>Store and manage your images securely in the cloud.</p>
      <div className="home-buttons">
        <Link to="/signup" className="btn btn-primary">Get Started</Link>
        <Link to="/login" className="btn btn-secondary">Login</Link>
      </div>
    </div>
  );
};

export default Home;