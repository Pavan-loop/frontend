import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from "./MainLayout";

const ConductTest = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [test, setTest] = useState([]);
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
        console.log(testres.data.prescription.tests)

      } catch (err) {
        console.error('Failed to fetch patient details:', err.message);
      }
    };
    fetchPatientDetails();
  }, [patientId]);

  const handleSubmitPrescription = async () => {
    try {
      // First, mark the patient as 'complete'
      const res = await axios.put(
        `http://localhost:5000/api/patient/status/complete/${patientId}`,
        {},
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      setPatient(res.data); // Update the patient data after marking as complete
      alert('Patient status updated to complete!');
      navigate('/testing/dashboard')
    } catch (err) {
      console.error('Failed to update patient status:', err.message);
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className="pat-container">
        <div className="prescription">
          <h3>Tests to Conduct</h3>
          <ul>
            {test.map((item, index) => (
              <li key={index}>
              <span>{item}</span>
            </li>
            ))}
              
          </ul>
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
                <button onClick={handleSubmitPrescription}>
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
