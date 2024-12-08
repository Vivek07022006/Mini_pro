import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import '../styles/user-dashboard.css';

const UserEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('/events');
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="user-events">
      <h2>Available Events</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEvents;
