import React, { useState } from "react"; // Import useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminEvents from './components/AdminEvents';
import AddEvent from './components/AddEvent';
import UpdateDeleteEvent from './components/UpdateDeleteEvent';
import UserEvents from './components/UserEvents';
import RegisterEvent from './components/RegisterEvent';
import UpdateRegistration from './components/UpdateRegistration';
import Home from './components/Home'; // Import new components
import About from './components/About'; // Import new components
import LoginRegister from './components/LoginRegister'; // Import new components

function App() {
  const [role, setRole] = useState(null); // State for user role

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* New Routes */}
          <Route path="/" element={<Home />} /> {/* Homepage */}
          <Route path="/about" element={<About />} /> {/* About Page */}
          <Route path="/login" element={<LoginRegister setRole={setRole} />} /> {/* Pass setRole to LoginRegister */}
          
          {/* Admin Routes */}
          <Route path="/dashboard-admin/events" element={<AdminEvents />} />
          <Route path="/dashboard-admin/add-event" element={<AddEvent />} />
          <Route path="/dashboard-admin/update-delete-event" element={<UpdateDeleteEvent />} />
          
          {/* User Routes */}
          <Route path="/dashboard-user/events" element={<UserEvents />} />
          <Route path="/dashboard-user/register-event" element={<RegisterEvent />} />
          <Route path="/dashboard-user/update-registration" element={<UpdateRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
