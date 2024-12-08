import React, { useState } from 'react';
import axios from 'axios'; // Import axios directly
import '../styles/login-register.css';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Set the base URL for your API
});

const LoginRegister = ({ setRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'User' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await api.post(endpoint, formData); // Use the api instance
      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        setRole(data.role);
        window.location.href = `/dashboard-${data.role.toLowerCase()}`;
      } else {
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error during registration/login:", error); // Log the error to the console
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-register">
      <div className="container">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label>Role</label>
            <select
              className="form-select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button className="btn btn-primary w-100" type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          className="btn btn-link w-100"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need to register? Click here' : 'Already have an account? Log in'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;
