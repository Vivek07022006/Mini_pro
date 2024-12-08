import React, { useState } from 'react';
import axios from '../services/api';
import '../styles/admin-dashboard.css';

const AddEvent = () => {
  const [eventData, setEventData] = useState({ name: '', date: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/events', eventData);
    alert('Event added successfully!');
    setEventData({ name: '', date: '', description: '' });
  };

  return (
    <div className="add-event">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Event Name</label>
          <input
            type="text"
            className="form-control"
            value={eventData.name}
            onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={eventData.date}
            onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
