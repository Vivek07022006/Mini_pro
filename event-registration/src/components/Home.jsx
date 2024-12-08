import React from 'react';
import '../styles/home.css';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="home">
      <div className="container text-center">
        <h1>Welcome to Event Manager</h1>
        <p>Manage and register for events seamlessly!</p>
      </div>
    </div>
  );
};

export default Home;
