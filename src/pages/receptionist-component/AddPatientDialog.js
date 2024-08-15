import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import axios from 'axios';
import "../../style/addPatient.css";

const AddPatientDialog = ({ isOpen, handleClose, refreshPatients }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    time: '',
    date: '',
    doctor: '',
    patientType: '',
    medicalCondition: '',
    age: '' 
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/emp/doctors');
        setDoctors(res.data);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      }
    };

    fetchDoctors();
  }, []);

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
      await axios.post('http://localhost:5000/api/patient/register', formData);
      refreshPatients();
      handleClose();
    } catch (err) {
      console.error('Failed to add patient:', err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add Patient</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Date"
                name="date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Doctor</InputLabel>
                <Select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  label="Doctor"
                >
                  {doctors.map(doctor => (
                    <MenuItem key={doctor._id} value={doctor._id}>
                      Dr. {doctor.firstName} {doctor.lastName} ({doctor.role})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Patient Type"
                name="patientType"
                value={formData.patientType}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Medical Condition"
                name="medicalCondition"
                value={formData.medicalCondition}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPatientDialog;
