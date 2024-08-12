import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from "./MainLayout";
import '../../style/test.css';

const TestingDashboard = () => {
  const [name, setName] = useState('');
  const [patients, setPatients] = useState([]);
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

    const fetchTestingPatients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/patient/testing/hehe', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setPatients(res.data);
      } catch (err) {
        console.error('Failed to fetch testing patients:', err.message);
      }
    };
    fetchTestingPatients();
  }, [navigate]);

  const handleConductTest = (patientId) => {
    navigate(`/conduct-test/${patientId}`);
  };

  return (
    <MainLayout>
      <div className="doctor-container">
        <div className="greetings">
          <h3>Welcome, {name}</h3>
          <span className='wish'>Have a nice day at work</span>
        </div>
        <div className="test-container">
          <div className="test-list">
            <h3>List of Tests</h3>
            <div className="test-card">
              <table>
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Patient Type</th>
                    <th>Medical Condition</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={patient._id}>
                      <td>{index + 1}</td>
                      <td>{patient.firstName} {patient.lastName}</td>
                      <td>{patient.age}</td>
                      <td>{patient.patientType}</td>
                      <td>{patient.medicalCondition}</td>
                      <td><button onClick={() => handleConductTest(patient._id)}>Conduct Test</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TestingDashboard;
