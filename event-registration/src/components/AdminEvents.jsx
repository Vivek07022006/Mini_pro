import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import '../styles/admin-dashboard.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('/events');
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="admin-events">
      <h2>All Events</h2>
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

export default AdminEvents;
