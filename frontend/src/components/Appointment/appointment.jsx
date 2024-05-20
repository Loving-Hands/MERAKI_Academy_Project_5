import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import backgroundImage from "./top-clinic.png";

import "./appointment.css";
export default function Appointment() {
  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const { token, userId } = useSelector((state) => ({
    token: state.auth.token,
    userId: state.auth.userId,
  }));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/appointment/user/${userId}`)
      .then((response) => {
        setAppointmentInfo(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [userId]);

  return (
    <section className="clinic-specialization">
      <div
        className="all-title-box"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="text-center">Your Appointments</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 appointmentPage">
        <table>
          <thead className="text-capitalize">
            <tr>
              <th scope="col">Name Doctor</th>
              <th scope="col">Location</th>
              <th scope="col">Booking date</th>
              <th scope="col">Delete Appointment</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {appointmentInfo.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.doctorName}</td>
                <td>{appointment.location}</td>
                <td>{appointment.bookingDate}</td>
                <td>
                  <button className="btn btn-danger">Cancel Appointment</button>
                </td>
                <td>{appointment.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
