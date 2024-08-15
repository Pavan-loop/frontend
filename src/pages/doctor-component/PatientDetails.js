import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/patientDetails.css';

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [medicines, setMedicines] = useState('');
  const [tests, setTests] = useState([]);
  const [customTest, setCustomTest] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/patient/${patientId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setPatient(res.data);
      } catch (err) {
        console.error('Failed to fetch patient details:', err.message);
        navigate('/doctor-dashboard');
      }
    };
    fetchPatientDetails();
  }, [patientId, navigate]);

  const addTest = (test) => {
    if (tests.includes(test)) {
      toast.error(`Test "${test}" already added!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setTests([...tests, test]);
    }
  };

  const deleteTest = (index) => {
    const updatedTests = tests.filter((_, i) => i !== index);
    setTests(updatedTests);
  };

  const handleMedicinesChange = (e) => {
    setMedicines(e.target.value);
  };

  const handleCustomTestChange = (e) => {
    setCustomTest(e.target.value);
  };

  const handleAddCustomTest = () => {
    if (customTest.trim()) {
      addTest(customTest);
      setCustomTest('');
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/prescription/add', {
        patientId,
        medicines,
        tests
      }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      toast.success('Prescription added successfully! and the test Sent to testing department', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await axios.put(`http://localhost:5000/api/modify/status/testing/${patientId}`, {}, {
        headers: {'x-auth-token': localStorage.getItem('token') }
      });

      setTimeout(() => {
        navigate('/doctor-dashboard');
      }, 2000); 
    } catch (err) {
      toast.error('Failed to add prescription:', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Failed to add prescription:', err.message);
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className="pat-container">
        <ToastContainer />
        <div className="prescription">
          <h2>Monitoring Plan</h2>

          <div className="prescription-area">
            <h3>Medicine Prescription</h3>
            <textarea
              placeholder="Write medicine prescription here..."
              value={medicines}
              onChange={handleMedicinesChange}
              rows="4"
              cols="50"
            />
          </div>
          <div className="quick-add-tests">
            <h4>Quick Add Tests:</h4>
            <div className="test-buttons">
              <button onClick={() => addTest('General Checkup')}>General Checkup</button>
              <button onClick={() => addTest('XRay')}>X-ray</button>
              <button onClick={() => addTest('ECG')}>ECG</button>
              <button onClick={() => addTest('Blood Test')}>Blood Test</button>
              <button onClick={() => addTest('MRI')}>MRI</button>
            </div>
          </div>
          <div className="custom-test">
            <h4>Add Custom Test:</h4>
            <input
              type="text"
              value={customTest}
              onChange={handleCustomTestChange}
              placeholder="Enter custom test name"
            />
            <button onClick={handleAddCustomTest}>Add Test</button>
          </div>
          <div className="added-tests">
            <h4>Added Tests:</h4>
            <ul>
              {tests.map((test, index) => (
                <li key={index}>
                  {test}
                  <button onClick={() => deleteTest(index)} className="delete-test-button">
                    &#10005;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="patient-details">
          <div className="pat-card">
            <div className="infos">
              <div className='profilee'></div>
              <h4>{patient.firstName} {patient.lastName}</h4>
              <p>{patient.age} Years {patient.gender}</p>
            </div>
            <hr />
            <div className="information">
              <div className="email">
                <h5>Email</h5>
                <p>{patient.email}</p>
              </div>
              <div className="email">
                <h5>Phone</h5>
                <p>8618836350</p>
              </div>
              <div className="email">
                <h5>Patient Type</h5>
                <p>{patient.patientType}</p>
              </div>
              <div className="email">
                <h5>Health Condition</h5>
                <p>{patient.medicalCondition}</p>
              </div>
              <div className="submit-btn">
              <button onClick={handleSubmit} className='submit'>Submit Prescription</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientDetails;
