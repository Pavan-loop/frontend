import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';
import '../../style/receptionist.css';

const ReceptionistDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [appointments, setAppointments] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [availableDoctors, setAvailableDoctors] = useState(0);
  const [yetToAttend, setYetToAttend] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5); // Number of patients per page

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch employee (receptionist) information
        const res = await axios.get('http://localhost:5000/api/emp/users', {
          headers: { 'x-auth-token': token },
        });
        setName(res.data.firstName);

        // Fetch patient data
        const patientRes = await axios.get('http://localhost:5000/api/patients', {
          headers: { 'x-auth-token': token },
        });

        const patientData = patientRes.data;
        setPatients(patientData);

        // Calculate metrics
        const total = patientData.length;
        const appointments = patientData.filter(patient => patient.status !== 'Complete').length;
        const yetToAttend = patientData.filter(patient => patient.status === 'Yet to check').length;
        const availableDoctors = await axios.get('http://localhost:5000/api/emp/doctors', {
          headers: { 'x-auth-token': token },
        });

        setAppointments(appointments);
        setTotalPatients(total);
        setYetToAttend(yetToAttend);
        setAvailableDoctors(availableDoctors.data.length);
      } catch (err) {
        console.error(err.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchData();
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

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = completedPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(completedPatients.length / patientsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGenerateBill = async (patient) => {
    navigate(`/billing/${patient._id}`);
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
                <i className="bi bi-person-fill-add"></i>
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
              <h2>{yetToAttend}</h2>
              <p>Yet To Attend</p>
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

        <div className="attended-patients">
          <h3>Attended Patient History</h3>
          <div className="att-container">
            <table>
              <thead>
                <tr>
                  <th>Sl.no</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Medical</th>
                  <th>Patient</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.map((patient, index) => (
                  <tr key={patient._id}>
                    <td>{indexOfFirstPatient + index + 1}</td>
                    <td>{`${patient.firstName} ${patient.lastName}`}</td>
                    <td>{patient.age}</td>
                    <td>{patient.medicalCondition}</td>
                    <td>{patient.patientType}</td>
                    <td>{patient.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>{currentPage}</span>
              <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(completedPatients.length / patientsPerPage)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReceptionistDashboard;
