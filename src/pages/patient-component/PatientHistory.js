import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/history.css';

const PatientHistory = () => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const patientId = localStorage.getItem('patientId');
    axios.get(`http://localhost:5000/api/patients/history/${patientId}`)
      .then(response => {
        setPatient(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-history">
      <h1 className="title">Patient History</h1>
      <div className="card-history">
        <h2 className="subtitle">Patient Details</h2>
        <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Time:</strong> {patient.time}</p>
        <p><strong>Date:</strong> {new Date(patient.date).toLocaleDateString()}</p>
        <p><strong>Type:</strong> {patient.patientType}</p>
        <p><strong>Condition:</strong> {patient.medicalCondition}</p>
        <p><strong>Status:</strong> {patient.status}</p>
      </div>
      <div className="card-history">
        <h2 className="subtitle">Doctor Details</h2>
        <p><strong>Name:</strong> {patient.doctor.firstName}</p>
        <p><strong>Phone:</strong> {patient.doctor.phoneNumber}</p>
        <p><strong>Gender:</strong> {patient.doctor.gender}</p>
        <p><strong>Role:</strong> {patient.doctor.role}</p>
      </div>
    </div>
  );
};

export default PatientHistory;
