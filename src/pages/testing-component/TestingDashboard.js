import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from "./MainLayout";

const TestingDashboard = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/emp/users', {
          headers: { 'x-auth-token': token },
        });
        setName(res.data.firstName);
      } catch (err) {
        console.error(err.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <MainLayout>
      <h1>{name}</h1>
    </MainLayout>
  )
}

export default TestingDashboard;