import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FaApple, FaHome, FaUsers, FaCommentDots, FaQuestionCircle, FaCog, FaLock, FaSignOutAlt } from 'react-icons/fa';

function Sidebar({ menuActive }) {
  const location = useLocation();

  // Function to determine if the link is active
  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`navigation ${menuActive ? 'active' : ''}`}>
      <ul>
        <li>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/dashboard">
              <span className="icon"><FaApple style={{ width: '30px' }} /></span>
              <span className="title">Brand Name</span>
            </Link>
          </div>
        </li>
        <li>
          <Link to="/" className={isActiveLink('/')}>
            <span className="icon"><FaHome /></span>
            <span className="title">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/customers" className={isActiveLink('/customers')}>
            <span className="icon"><FaUsers /></span>
            <span className="title">Customers</span>
          </Link>
        </li>
        <li>
          <Link to="/messages" className={isActiveLink('/messages')}>
            <span className="icon"><FaCommentDots /></span>
            <span className="title">Messages</span>
          </Link>
        </li>
        <li>
          <Link to="/help" className={isActiveLink('/help')}>
            <span className="icon"><FaQuestionCircle /></span>
            <span className="title">Help</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className={isActiveLink('/settings')}>
            <span className="icon"><FaCog /></span>
            <span className="title">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/password" className={isActiveLink('/password')}>
            <span className="icon"><FaLock /></span>
            <span className="title">Password</span>
          </Link>
        </li>
        <li>
          <a href='#' className={isActiveLink('/signout')}>
            <span className="icon"><FaSignOutAlt /></span>
            <span className="title">Sign Out</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
