import React from 'react';
import { FaBars } from 'react-icons/fa';

const Topbar = ({ toggleMenu }) => {
  return (
    <div className="topbar">
      <div className="toggle" onClick={toggleMenu}>
        <FaBars />
      </div>
      <div className="search">
        <label> 
        <input type="text" placeholder="Search..." />
        </label>
      </div>
      <div className="user">
        <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User" />
      </div>
    </div>
  );
};

export default Topbar;
