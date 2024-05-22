import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import backgroundImage from "./top-clinic.png";
import "./appointment.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Appointment() {
  // ----- modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ----- modal End

  const [appointmentInfo, setAppointmentInfo] = useState([]);

  const { token, userId, doctorId } = useSelector((state) => ({
    token: state.auth.token,
    userId: state.auth.userId,
    doctorId: state.doc.doctorId,
  }));
  const roleId = localStorage.getItem("roleId");


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
  // console.log(time);
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
  // --------------------- form
  const [file, setFile] = useState();
  const [diagnosis, setDiagnosis] = useState("");
  function handleDiagonosis(e) {
    setDiagnosis(e.target.value);
  }

  function handleChange(e) {
    // console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleFormDiagnosis = (clinic_id, user_id, e) => {
    e.preventDefault();

    const value = {
      diagnostics: diagnosis,
      image_diagnostics: file,
    };
    axios
      .post(
        `http://localhost:5000/diagnostics/create/${clinic_id}/${user_id}`,
        value,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        alert("Dignoses Send");
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
  // --------------------- form End

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
              <th scope="col">Booking date/time</th>
              <th scope="col">Delete Appointment</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {appointmentInfo.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.clinic_name}</td>
                <td>{appointment.clinic_location}</td>
                <td>
                  {appointment.date.split("T")[0]}/{appointment.time}
                </td>
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
                {}
                <td>
                  <Button variant="secondary" onClick={handleShow}>
                    Send Diagnosis
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-capitalize">
                        The Patient's diagnosis.
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form
                        onSubmit={(e) => {
                          handleFormDiagnosis(
                            appointment.clinic_id,
                            appointment.user_id,
                            e
                          );
                        }}
                      >
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label className="fw-bold">
                            Patient Notes
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={handleDiagonosis}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label className="fw-bold">
                            The Diagnosis Image
                          </Form.Label>
                          <Form.Control type="file" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        ></Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="float-end btn-secondary"
                        >
                          Send
                        </Button>
                      </Form>
                    </Modal.Body>
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
