import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import '../styles/user-dashboard.css';

const RegisterEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('/events');
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleRegister = async () => {
    await axios.post('/registrations', { eventId: selectedEvent });
    alert('Successfully registered for the event!');
  };

  return (
    <div className="register-event">
      <h2>Register for an Event</h2>
      <select
        className="form-select"
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
        required
      >
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.name}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={handleRegister} disabled={!selectedEvent}>
        Register
      </button>
    </div>
  );
};

export default RegisterEvent;
