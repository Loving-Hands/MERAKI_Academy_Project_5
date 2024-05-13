import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1787e0" }}>
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <NavLink to="/" className="navbar-brand mr-auto">LovingHands</NavLink>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ width: "250px" }} />
        </form>
        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contactus" className="nav-link">Contact Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/allClinics" className="nav-link">Clinics</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
