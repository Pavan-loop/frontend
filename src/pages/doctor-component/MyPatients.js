import React, { useState, useEffect } from "react";
import MainLayout from "./MainLayout";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/myPatients.css';

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      try {
        const res = await axios.get(`http://localhost:5000/api/patient/doctor/${userId}`, {
          headers: { 'x-auth-token': token }
        });
        setPatients(res.data);
      } catch (err) {
        console.error(err.message);
        localStorage.removeItem('token');
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient => 
    patient.status === 'Yet to check' || 
    patient.status === 'Ongoing' || 
    patient.status === 'Testing'
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => prev - 1);
  };

  const handleAccept = async (patientId) => {
    try {
      await axios.put(`http://localhost:5000/api/modify/status/${patientId}`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      navigate(`/my-patients/details/${patientId}`);
    } catch (err) {
      console.error('Failed to update patient status:', err.message);
    }
  };

  return (
    <MainLayout>
      <div className="patient-container">
        <h2>My Patients</h2>
        <div className="checkups">
          <h3>Checkups</h3>
          <table>
            <thead>
              <tr>
                <th>SL No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Medical</th>
                <th>Patient Type</th>
                <th>Email</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.length > 0 ? (
                currentPatients.map((patient, index) => (
                  <tr key={patient._id}>
                    <td>{indexOfFirstPatient + index + 1}</td>
                    <td>{patient.firstName} {patient.lastName}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.medicalCondition}</td>
                    <td>{patient.patientType}</td>
                    <td>{patient.email}</td>
                    <td>
                    {patient.status === 'Testing' ? (
                      <button className='testing'>Testing</button>
                    ) : (
                      <>
                        <button className='accept' onClick={() => handleAccept(patient._id)}>Accept</button>
                      </>
                    )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No patients to show.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(filteredPatients.length / patientsPerPage)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyPatients;
