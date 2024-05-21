import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import backgroundImage from "./top-clinic.png";
import "./appointment.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Appointment() {
  // ----- modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ----- modal End

  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const { token, userId } = useSelector((state) => ({
    token: state.auth.token,
    userId: state.auth.userId,
  }));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/appointment/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAppointmentInfo(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [userId, token]);
  // ----------convert time to 24Hours-------------
  const date = new Date();
  const options = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const time = date.toLocaleTimeString("en-US", options);
  console.log(time);
  // ---------------

  const handleCancelAppointment = (clinicId, appointmentId) => {
    axios
      .delete(
        `http://localhost:5000/appointment/${clinicId}/${appointmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setAppointmentInfo((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.id !== appointmentId
          )
        );
      })
      .catch((error) => {
        console.error("Error canceling appointment:", error);
      });
  };

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
                <td>{appointment.clinic_name}</td>
                <td>{appointment.clinic_location}</td>
                <td>{appointment.date_time}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleCancelAppointment(
                        appointment.clinic_id,
                        appointment.id
                      )
                    }
                  >
                    Cancel Appointment
                  </button>
                </td>
                <td>{appointment.status}</td>
                <td>
                  <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Woohoo, you are reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
