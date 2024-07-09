// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { 'x-auth-token': token },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);
  const handleLogout = () => {
    // Clear token from localStorage (or session storage)
    localStorage.removeItem('token');
    
    // Redirect user to login page
    navigate('/');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user && <p>Welcome, {user.name}</p>}
      <button onClick={handleLogout} className="btn-outline-danger">Logout</button>
    </div>
  );
};

export default Dashboard;
