import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Billing from './pages/receptionist-component/Billing';
import Plans from './pages/Plans';
import DocDashboard from './pages/doctor-component/DocDashboard'
import ReceptionistDashboard from './pages/receptionist-component/ReceptionistComponent';
import AddPatients from './pages/receptionist-component/AddPatients';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MyPatients from './pages/doctor-component/MyPatients';
import PatientDetails from './pages/doctor-component/PatientDetails';
import PatientRegistration from './pages/patient-component/PatientRegistration';
import PatientLogin from './pages/patient-component/PatientLogin';
import TestingDashboard from './pages/testing-component/TestingDashboard';
import ConductTest from './pages/testing-component/Conducttest';
import PatientHistory from './pages/patient-component/PatientHistory';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/doctor-dashboard" element={<DocDashboard />} />
        <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />
        <Route path="/add-patients" element={<AddPatients />} />
        <Route path="/my-patients" element={<MyPatients />} />
        <Route path="/my-patients/details/:patientId" element={<PatientDetails />} />
        <Route path="/billing/:patientId" element={<Billing />} />
        <Route path='/patient/register' element={<PatientRegistration />} />
        <Route path='/patient/login' element={<PatientLogin />} />
        <Route path='/testing/dashboard' element={<TestingDashboard />} />
        <Route path='/conduct-test/:patientId' element={<ConductTest />} />
        <Route path='/patient/history' element={<PatientHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
