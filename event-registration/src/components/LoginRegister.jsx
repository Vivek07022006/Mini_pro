import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import '../styles/login-register.css';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Register
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'adm', // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    try {
      const { data } = await api.post(endpoint, formData);
      if (isLogin) {
        localStorage.setItem('token', data.token);
        const redirectPath = data.role === 'adm' ? '/dashboard-admin' : '/dashboard-user';
        window.location.href = redirectPath;
      } else {
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login">
      <NavBar />
      <div className="login__form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="adm">Admin</option>
              <option value="usr">User</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <button
          className="btn-link"
          onClick={() => setIsLogin(!isLogin)}
          style={{
            marginTop: '10px',
            background: 'none',
            border: 'none',
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {isLogin ? 'Need to register? Click here' : 'Already a user? Log in'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;
