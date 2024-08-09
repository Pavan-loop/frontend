import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';

const Dashboard = () => {
  const [appointments, setAppointments] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [availableDoctors, setAvailableDoctors] = useState(0);
  const [availableReceptionists, setAvailableReceptionists] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch all patients and categorize by status
        const patientRes = await axios.get('http://localhost:5000/api/patients', {
          headers: { 'x-auth-token': token },
        });

        const patients = patientRes.data;
        const total = patients.length;
        const completedAppointments = patients.filter(patient => patient.status === 'Complete').length;
        const ongoingAppointments = total - completedAppointments;

        setTotalPatients(total);
        setAppointments(ongoingAppointments);

        // Fetch all doctors
        const doctorsRes = await axios.get('http://localhost:5000/api/emp/doctors', {
          headers: { 'x-auth-token': token },
        });

        const doctors = doctorsRes.data;
        setAvailableDoctors(doctors.length);

        // Fetch all employees and filter receptionists
        const employeesRes = await axios.get('http://localhost:5000/api/emp/get', {
          headers: { 'x-auth-token': token },
        });

        const receptionists = employeesRes.data.filter(employee => employee.role === 'receptionist');
        setAvailableReceptionists(receptionists.length);

      } catch (err) {
        console.error(err.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <MainLayout>
      <div className="doc-container">
        <div className="greetings">
          <h3>Welcome, Admin</h3>
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
              <h2>{appointments}</h2>
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
              <h2>{totalPatients}</h2>
              <p>Total Patients</p>
            </div>
          </div>

          <div className="card-three">
            <div className="icon">
              <div className="item">
                <i className="bi bi-check2-square"></i>
              </div>
            </div>
            <div className="info">
              <h2>{availableDoctors}</h2>
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
              <h2>{availableReceptionists}</h2>
              <p>Available Receptionists</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
