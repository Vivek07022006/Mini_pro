import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import '../styles/admin-dashboard.css';

const UpdateDeleteEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({ name: '', date: '', description: '' });

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('/events');
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`/events/${selectedEvent}`, eventData);
    alert('Event updated successfully!');
    setSelectedEvent(null);
    setEventData({ name: '', date: '', description: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/events/${id}`);
    alert('Event deleted successfully!');
    setEvents(events.filter((event) => event._id !== id));
  };

  return (
    <div className="update-delete-event">
      <h2>Update/Delete Events</h2>
      <div className="event-list">
        {events.map((event) => (
          <div key={event._id} className="event-item">
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <button className="btn btn-warning" onClick={() => {
              setSelectedEvent(event._id);
              setEventData({ name: event.name, date: event.date, description: event.description });
            }}>
              Update
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(event._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <form onSubmit={handleUpdate}>
          <h4>Update Event</h4>
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
            Update Event
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateDeleteEvent;
