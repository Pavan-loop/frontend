import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../../style/patientLogin.css";

const PatientLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/patient/login', formData);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('patientToken', response.data.token);

        navigate('/patient/history');
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-login-form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PatientLogin;
