import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import AdminSidebar from './AdminSidebar'; // Use the same sidebar
import '../styles/admin-events.css'; // Reuse the admin-events.css

const UpdateDeleteEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({ name: '', date: '', description: '' });

  // Fetch events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('/events');
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Handle event update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/events/${selectedEvent}`, eventData);
      alert('Event updated successfully!');
      setSelectedEvent(null);
      setEventData({ name: '', date: '', description: '' });
      const { data } = await axios.get('/events'); // Refresh the events list
      setEvents(data);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event.');
    }
  };

  // Handle event deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/events/${id}`);
      alert('Event deleted successfully!');
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event.');
    }
  };

  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar /> {/* Sidebar */}
      <div className="content admin-events">
        <h2 className="text-center mb-4">Update/Delete Events</h2>
        <div className="event-cards">
          {events.map((event) => (
            <div key={event._id} className="card event-card shadow-sm">
              <div className="card-body">
                <h3 className="card-title">{event.name}</h3>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="card-text">{event.description}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setSelectedEvent(event._id);
                      setEventData({ name: event.name, date: event.date.split('T')[0], description: event.description });
                    }}
                  >
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(event._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <form onSubmit={handleUpdate} className="mt-4">
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
    </div>
  );
};

export default UpdateDeleteEvent;
