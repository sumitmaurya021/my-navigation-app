import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Messages from './pages/Messages';
import Help from './pages/Help';
import Settings from './pages/Settings';
import Password from './pages/Password';
import SignOut from './pages/SignOut';

function App() {
  const [menuActive, setMenuActive] = useState(false);

  // Toggle function to open/close the sidebar
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <Router>
      <div className="container-fluid">
        <Sidebar menuActive={menuActive} />
        <div className={`main ${menuActive ? 'menu-active' : ''}`}>
          <Topbar toggleMenu={toggleMenu} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/password" element={<Password />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
