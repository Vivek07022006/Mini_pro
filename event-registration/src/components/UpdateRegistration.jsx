import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import '../styles/user-dashboard.css';

const UpdateRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      const { data } = await axios.get('/registrations'); // Assuming an endpoint for fetching user registrations
      setRegistrations(data);
    };
    fetchRegistrations();
  }, []);

  const handleUpdate = async () => {
    await axios.put(`/registrations/${selectedRegistration}`); // Adjust according to your API design
    alert('Registration updated successfully!');
  };

  return (
    <div className="update-registration">
      <h2>Update My Registration</h2>
      <select
        className="form-select"
        value={selectedRegistration}
        onChange={(e) => setSelectedRegistration(e.target.value)}
        required
      >
        <option value="">Select a registration to update</option>
        {registrations.map((registration) => (
          <option key={registration._id} value={registration._id}>
            {registration.eventName} - {registration.date}
          </option>
        ))}
      </select>
      <button className="btn btn-warning" onClick={handleUpdate} disabled={!selectedRegistration}>
        Update Registration
      </button>
    </div>
  );
};

export default UpdateRegistration;
