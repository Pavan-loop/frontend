// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
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

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/plans', {
          headers: { 'x-auth-token': token },
        });
        setPlans(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchPlans();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <MainLayout>
      <h2>Dashboard</h2>
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {plan.planName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {plan.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Dashboard;
