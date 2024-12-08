import React from 'react';
import '../styles/about.css';
import NavBar from './NavBar';

const About = () => {
  return (
    <div className="about">
      <NavBar />
      <div className="content">
        <h1>About Event Manager</h1>
        <p>
          Event Manager is a comprehensive platform designed to make event management
          effortless and efficient. Whether you're planning a conference, workshop, or
          seminar, our tools help you manage registrations, scheduling, and more.
        </p>
      </div>
    </div>
  );
};

export default About;
