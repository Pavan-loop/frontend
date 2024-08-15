import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from "./MainLayout";
import '../../style/conduct.css'; 

const ConductTest = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [test, setTest] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/patient/${patientId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setPatient(res.data);

        const testres = await axios.get(`http://localhost:5000/api/test/${patientId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setTest(testres.data.prescription.tests);
        setCompletedTests(new Array(testres.data.prescription.tests.length).fill(false)); // Initialize with false
      } catch (err) {
        console.error('Failed to fetch patient details:', err.message);
      }
    };
    fetchPatientDetails();
  }, [patientId]);

  useEffect(() => {
    const allCompleted = completedTests.every(completed => completed);
    setIsSubmitEnabled(allCompleted);
  }, [completedTests]);

  const handleMarkAsDone = (index) => {
    const updatedCompletedTests = [...completedTests];
    updatedCompletedTests[index] = true;
    setCompletedTests(updatedCompletedTests);
  };

  const handleSubmitPrescription = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/patient/status/complete/${patientId}`,
        {},
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      alert('Patient status updated to complete!');
      navigate('/testing/dashboard');
    } catch (err) {
      console.error('Failed to update patient status:', err.message);
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className="pat-container">
        <div className="prescription">
         <div className="rabaraba">
         <h3>Tests to Conduct</h3>
          <div className="card-container">
            {test.map((item, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <h4>{item}</h4>
                  {completedTests[index] ? (
                    <button className="done-button" disabled>Done</button>
                  ) : (
                    <button className="mark-done-button" onClick={() => handleMarkAsDone(index)}>Mark as Done</button>
                  )}
                </div>
              </div>
            ))}
          </div>
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
                <p>{patient.phone}</p>
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
                <button onClick={handleSubmitPrescription} disabled={!isSubmitEnabled} className='submit'>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConductTest;
