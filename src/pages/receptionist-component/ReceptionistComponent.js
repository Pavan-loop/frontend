import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';
import '../../style/receptionist.css';

const ReceptionistDashboard = () => {
  const [patients, setPatients] = useState([]);
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

    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/patients');
        setPatients(res.data);
      } catch (err) {
        console.error('Error fetching patient data:', err.message);
      }
    };

    fetchUser();
    fetchPatients();
  }, [navigate]);

  const getStatusButton = (status) => {
    switch (status) {
      case 'Ongoing':
        return <button className='ongoing'>Ongoing</button>;
      case 'Complete':
        return <button className='complete'>Complete</button>;
      case 'Testing':
        return <button className='testing'>Testing</button>
      case 'Yet to check':
      default:
        return <button className='yet-to-check'>Registered</button>;
    }
  };

  const ongoingAndYetToCheckPatients = patients.filter(patient =>
    patient.status === 'Yet to check' || patient.status === 'Ongoing' || patient.status === 'Testing'
  );
  const completedPatients = patients.filter(patient => patient.status === 'Complete');

  const handleGenerateBill = async (patient) => {
    navigate('/billing');
  };

  return (
    <MainLayout>
      <div className="rep-container">
        <div className="greetings">
          <h3>Welcome, {name}</h3>
          <span className='wish'>Have a nice day at work</span>
        </div>
        <div className="cards">
          <div className="card-one">
            <div className="icon">
              <div className="item">
                <i className="bi bi-clipboard"></i>
              </div>
            </div>
            <div className="info">
              <h2>24.5K</h2>
              <p>Appointments</p>
            </div>
          </div>
          
          <div className="card-two">
            <div className="icon">
              <div className="item">
                <i className="bi bi-person"></i>
              </div>
            </div>
            <div className="info">
              <h2>20.0K</h2>
              <p>Total Patients</p>
            </div>
          </div>

          <div className="card-three">
            <div className="icon">
              <div className="item">
                <i className="bi bi-person-fill-add"></i>
              </div>
            </div>
            <div className="info">
              <h2>14.5K</h2>
              <p>Available Doctors</p>
            </div>
          </div>

          <div className="card-four">
            <div className="icon">
              <div className="item">
                <i className="bi bi-hourglass-split"></i>
              </div>
            </div>
            <div className="info">
              <h2>1.5K</h2>
              <p>Yet To Attended</p>
            </div>
          </div>
        </div>

        <div className="rep-main-container">
          <div className="rep-patient-status">
            <h3>Patient Status Details</h3>
            <div className="rep-status">
              {ongoingAndYetToCheckPatients.length > 0 ? (
                ongoingAndYetToCheckPatients.map((patient) => (
                  <div className="rep-just-a-thing" key={patient._id}>
                    <div className='rep-informationn'>
                      <h4>{patient.firstName} {patient.lastName}</h4>
                      <p>{patient.age} {patient.gender}, {new Date(patient.date).toLocaleDateString()} {patient.time}</p>
                    </div>
                    <div className='rep-status-button'>
                      {getStatusButton(patient.status)}
                    </div>
                  </div>
                ))
              ) : (
                <p className='no'>No New Patients Yet</p>
              )}
            </div>
          </div>

          <div className="billing-section">
            <h3>Billing Section</h3>
            <div className="rep-status">
              {completedPatients.length > 0 ? (
                completedPatients.map((patient) => (
                  <div className="rep-just-a-thing" key={patient._id}>
                    <div className='rep-informationn'>
                      <h4>{patient.firstName} {patient.lastName}</h4>
                      <p>{patient.age} {patient.gender}, {new Date(patient.date).toLocaleDateString()} {patient.time}</p>
                    </div>
                    <div className='rep-status-button'>
                      <button className='generate' onClick={() => handleGenerateBill(patient)}>Generate Bill</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className='no'>No Patients Yet</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default ReceptionistDashboard;
