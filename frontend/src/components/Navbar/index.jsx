import React from 'react'
import { NavLink } from 'react-router-dom'


function index() {
  return (
    <nav>
        <h1> router</h1>
        <NavLink to="/">Home</NavLink>
        <NavLink to="login">login</NavLink>
        <NavLink to="regester">Regester</NavLink>
        <NavLink to="contactus">ContactUs</NavLink>
        <NavLink to="allClinics">Clinics</NavLink>
    </nav>
  )
}

export default index