import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../style/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <ul className='sideList'>
        <li>
          <NavLink
            to="/testing/dashboard"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <i className="bi bi-grid"></i>
            <div className="listt">OverView</div>
          </NavLink>
        </li>
      </ul>

      <ul className='logout'>
      <li onClick={handleLogout}>
          <NavLink to="/"> <div className="logout-c"><i class="bi bi-box-arrow-left"></i>Logout</div> </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;