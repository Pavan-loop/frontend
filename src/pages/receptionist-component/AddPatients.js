
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import MainLayout from "./MainLayout";
import AddPatientDialog from "./AddPatientDialog";
import ChangeDoctorDialog from "./ChangeDoctorDialog";
import '../../style/addPatient.css';

const AddPatients = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDoctorDialogOpen, setIsDoctorDialogOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const patientsPerPage = 5;

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDoctorDialogOpen = (patient) => {
    setSelectedPatient(patient);
    setIsDoctorDialogOpen(true);
  };

  const handleDoctorDialogClose = () => {
    setIsDoctorDialogOpen(false);
  };

  const refreshPatients = (newPatient) => {
    if (newPatient) {
      setPatients(prevPatients => [newPatient, ...prevPatients]);
    } else {
      fetchPatients();
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error("There was an error fetching the patients!", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/emp/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error("There was an error fetching the doctors!", error);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * patientsPerPage;
  const currentPatients = patients.slice(offset, offset + patientsPerPage);
  const pageCount = Math.ceil(patients.length / patientsPerPage);

  return (
    <MainLayout>
      <div className="patient-container">
        <div className="headders">
          <h4>Patient List</h4>
          <button className="add-patients" onClick={handleDialogOpen}>
            <i className="bi bi-plus-lg"></i> Add Patients
          </button>
        </div>
        <AddPatientDialog 
          isOpen={isDialogOpen} 
          handleClose={handleDialogClose} 
          refreshPatients={refreshPatients} 
        />
        <div className="show-patients">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Gender</th>
                <th>Time of Visit</th>
                <th>Date of Visit</th>
                <th>Doctor</th>
                <th>Patient Type</th>
                <th>Medical Condition</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{`${patient.firstName} ${patient.lastName}`}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.time}</td>
                  <td>{new Date(patient.date).toLocaleDateString()}</td>
                  <td>
                    {patient.doctor 
                      ? `Dr. ${patient.doctor.firstName} ${patient.doctor.lastName}`
                      : 'N/A'
                    }
                  </td>
                  <td>{patient.patientType}</td>
                  <td>{patient.medicalCondition}</td>
                  <td>
                    <button className="change-doctor" onClick={() => handleDoctorDialogOpen(patient)}>
                      Change Doctor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
        <ChangeDoctorDialog
          isOpen={isDoctorDialogOpen} 
          handleClose={handleDoctorDialogClose} 
          doctors={doctors}
          selectedPatient={selectedPatient}
          refreshPatients={fetchPatients}
        />
      </div>
    </MainLayout>
  );
};

export default AddPatients;
