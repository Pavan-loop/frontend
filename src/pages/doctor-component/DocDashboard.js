import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';
import ReactPaginate from 'react-paginate';
import '../../style/doc.css';

const DoctorDashboard = () => {
  const [name, setName] = useState('');
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [attendedPatients, setAttendedPatients] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [yetToAttend, setYetToAttend] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientDoctorPage, setPatientDoctorPage] = useState(0);
  const [patientsPerPage] = useState(5);

  const navigate = useNavigate();
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch doctor information
        const res = await axios.get('http://localhost:5000/api/emp/users', {
          headers: { 'x-auth-token': token },
        });
        setName(res.data.firstName);

        // Fetch patients assigned to this doctor
        const patientRes = await axios.get(`http://localhost:5000/api/patient/doctor/${userId}`, {
          headers: { 'x-auth-token': token },
        });

        const patientData = patientRes.data;

        // Set patient data and calculate metrics
        setPatients(patientData);

        const totalPatients = patientData.length;
        const attended = patientData.filter(patient => patient.status === 'Complete').length;
        const appointments = totalPatients - attended;
        const yetToAttend = patientData.filter(patient => patient.status === 'Yet to check').length;

        setTotalPatients(totalPatients);
        setAttendedPatients(attended);
        setAppointments(appointments);
        setYetToAttend(yetToAttend);

      } catch (err) {
        console.error(err.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handlePatientDoctorPageClick = (data) => {
    setPatientDoctorPage(data.selected);
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

  // Pagination for attended patients
  const attendedPatientList = patients.filter(patient => patient.status === 'Complete');
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = attendedPatientList.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => prev - 1);
  };

  const filteredPatients = patients.filter(patient => patient.status !== 'Complete');
  const displayedPatientToDoctor = filteredPatients.slice(patientDoctorPage * itemsPerPage, (patientDoctorPage + 1) * itemsPerPage);

  return (
    <MainLayout>
      <div className="doc-container">
        <div className="greetings">
          <h3>Welcome, Dr. {name}</h3>
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
              <h2>{attendedPatients}</h2>
              <p>Attended Patients</p>
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
              <p>Yet to Attend</p>
            </div>
          </div>
        </div>

        <div className="control-pannel">
        <div className="appointments">
          <h3>Appointments</h3>
          <div className="appointment-container">
            {filteredPatients.length > 0 ? (
              displayedPatientToDoctor.map((patient, index) => (
                <div key={index} className="just-a-thing">
                  <div className='informationn'>
                    <h4>{`${patient.firstName} ${patient.lastName}`}</h4>
                    <p>{`${patient.age} ${patient.gender}, ${new Date(patient.date).toLocaleDateString()} ${patient.time}`}</p>
                  </div>
                  <div className='status'>
                    <div></div>
                    {patient.status === 'Testing' ? (
                      <button className='testing'>Testing</button>
                    ) : (
                      <>
                        <button className='accept' onClick={() => handleAccept(patient._id)}>Accept</button>
                        <button className='stat'>Decline</button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No patients yet.</p>
            )}
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={Math.ceil(filteredPatients.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePatientDoctorPageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
        <div className="right-side">
          
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
                {currentPatients.length > 0 ? (
                  currentPatients.map((patient, index) => (
                    <tr key={patient._id}>
                      <td>{indexOfFirstPatient + index + 1}</td>
                      <td>{patient.firstName} {patient.lastName}</td>
                      <td>{patient.age}</td>
                      <td>{patient.medicalCondition}</td>
                      <td>{patient.patientType}</td>
                      <td>{patient.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No attended patients yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(attendedPatientList.length / patientsPerPage)}>
              Next
            </button>
          </div>
          </div>
          
        </div>

      </div>
    </MainLayout>
  );
};

export default DoctorDashboard;
