import React, { useState } from "react";
import axios from "axios";
import '../../style/doctor.css';

const ChangeDoctorDialog = ({ isOpen, handleClose, doctors, selectedPatient, refreshPatients }) => {
  const [newDoctor, setNewDoctor] = useState('');

  const handleDoctorChange = async () => {
    try {
      await axios.put(`http://localhost:5000/api/patient/${selectedPatient._id}/change-doctor`, {
        doctorId: newDoctor
      });
      refreshPatients(); 
      handleClose();
    } catch (error) {
      console.error("There was an error changing the doctor!", error);
    }
  };

  if (!isOpen || !selectedPatient) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h4>Change Doctor for {selectedPatient.firstName} {selectedPatient.lastName}</h4>
        <select value={newDoctor} onChange={(e) => setNewDoctor(e.target.value)}>
          <option value="" disabled>Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>
              {`Dr. ${doctor.firstName} ${doctor.lastName}`}
            </option>
          ))}
        </select>
        <div className="dialog-actions">
          <button onClick={handleDoctorChange} className="save-button">Save</button>
          <button onClick={handleClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeDoctorDialog;
