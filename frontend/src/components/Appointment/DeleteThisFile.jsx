<div>
  <Button variant="secondary" onClick={handleShow}>
    Send Diagnosis
  </Button>
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title className="text-capitalize">
        The Patient's diagnosis
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form
        onSubmit={(e) =>
          handleFormDiagnosis(appointment.clinic_id, appointment.user_id, e)
        }
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Patient Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={handleDiagnosisChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fw-bold">The Diagnosis Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="float-end btn-secondary"
          onClick={saveImage}
        >
          Send
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
</div>;

// --------------------------------- full code -------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import backgroundImage from "./top-clinic.png";
import "./appointment.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Appointment() {
  const [show, setShow] = useState(false);
  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const [file, setFile] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [resultDiagnostics, setResultDiagnostics] = useState({});
  const [appointmentDoctor, setAppointmentDoctor] = useState({});

  const { token, userId, doctorId } = useSelector((state) => ({
    token: state.auth.token,
    userId: state.auth.userId,
    doctorId: state.doc.doctorId,
  }));

  const roleId = localStorage.getItem("roleId");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/appointment/clinicApp", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          setAppointmentDoctor(result.data.data);
        })

        .catch((error) => {
          console.error("Error fetching clinic appointments:", error);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token && userId) {
      axios
        .get(`http://localhost:5000/appointment/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (Array.isArray(response.data.result)) {
            setAppointmentInfo(response.data.result);
          } else {
            console.error(
              "Expected an array from API but got",
              response.data.result
            );
            setAppointmentInfo([]);
          }
        })
        .catch((error) =>
          console.error("Error fetching user appointments:", error)
        );
    }
  }, [userId, token]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      .catch((error) => console.error("Error canceling appointment:", error));
  };

  const handleDiagnosisChange = (e) => setDiagnosis(e.target.value);

  const saveImage = () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "project_5");
    data.append("cloud_name", "dobvkevkw");

    axios
      .post(`https://api.cloudinary.com/v1_1/dobvkevkw/image/upload`, data)
      .then((result) => setFile(result.data.url))
      .catch((error) => console.error("Error uploading image:", error));
  };

  const handleFormDiagnosis = (clinicId, userId, e) => {
    e.preventDefault();
    const value = { diagnostics: diagnosis, image_diagnostics: file };

    axios
      .post(
        `http://localhost:5000/diagnostics/create/${clinicId}/${userId}`,
        value,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((result) => console.log("Diagnosis submitted successfully"))
      .catch((error) => console.error("Error submitting diagnosis:", error));
  };

  const handleDiagnosisResult = (clinicId) => {
    axios
      .get(`http://localhost:5000/diagnostics/${clinicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setResultDiagnostics(result.data[0]))
      .catch((error) => console.error("Error fetching diagnosis:", error));
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
            {roleId === "1" ? (
              <tr>
                <th scope="col">Name Doctor</th>
                <th scope="col">Location</th>
                <th scope="col">Booking date/time</th>
                <th scope="col">Delete Appointment</th>
                <th scope="col">Details</th>
                <th scope="col">Action</th>
              </tr>
            ) : (
              <tr>
                <th scope="col">Patient Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Booking date/time</th>
                <th scope="col">Delete Appointment</th>
                <th scope="col">Urgent</th>
                <th scope="col">Action</th>
              </tr>
            )}
          </thead>
          {roleId === "1" ? (
            <tbody>
              {appointmentInfo.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.clinic_name}</td>
                  <td>{appointment.clinic_location}</td>
                  <td>
                    {appointment.date.split("T")[0]} / {appointment.time}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleCancelAppointment(
                          appointment.clinic_id,
                          appointment.id
                        )
                      }
                    >
                      Cancel Appointment
                    </Button>
                  </td>
                  <td>{appointment.status}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        handleShow();
                        handleDiagnosisResult(appointment.clinic_id);
                      }}
                    >
                      Show Diagnosis
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title className="text-capitalize">
                          Your Diagnosis Is:
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>{resultDiagnostics.diagnostics}</p>
                        <img
                          src={resultDiagnostics.image_diagnostics}
                          style={{ width: "100%", height: "100%" }}
                          alt="Diagnosis"
                        />
                      </Modal.Body>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {appointmentDoctor.map((appointmentDoc) => (
                <tr key={appointmentDoc.id}>
                  <td>{appointmentDoc.full_name}</td>
                  <td>{appointmentDoc.email}</td>
                  <td>{appointmentDoc.phone_number}</td>
                  <td>{appointmentDoc.date}</td>
                  <td>delete</td>
                  <td>{appointmentDoc.status}</td>
                  <td>
                    <div>
                      <Button variant="secondary" onClick={handleShow}>
                        Send Diagnosis
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title className="text-capitalize">
                            The Patient's diagnosis
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form
                            onSubmit={(e) =>
                              handleFormDiagnosis(
                                appointment.clinic_id,
                                appointment.user_id,
                                e
                              )
                            }
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
                                onChange={handleDiagnosisChange}
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword"
                            >
                              <Form.Label className="fw-bold">
                                The Diagnosis Image
                              </Form.Label>
                              <Form.Control
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                              />
                            </Form.Group>
                            <Button
                              variant="primary"
                              type="submit"
                              className="float-end btn-secondary"
                              onClick={saveImage}
                            >
                              Send
                            </Button>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </section>
  );
}
// ---------------------------- old code 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import backgroundImage from "./top-clinic.png";
import "./appointment.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Appointment() {
  const [show, setShow] = useState(false);
  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const [file, setFile] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [resultDiagnostics, setResultDiagnostics] = useState([]);

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
      .then((response) => setAppointmentInfo(response.data.result))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, [userId, token]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      .catch((error) => console.error("Error canceling appointment:", error));
  };

  const handleDiagnosisChange = (e) => setDiagnosis(e.target.value);

  const saveImage = () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "project_5");
    data.append("cloud_name", "dobvkevkw");

    axios
      .post(`https://api.cloudinary.com/v1_1/dobvkevkw/image/upload`, data)
      .then((result) => setFile(result.data.url))
      .catch((error) => console.error("Error uploading image:", error));
  };

  const handleFormDiagnosis = (clinicId, userId, e) => {
    e.preventDefault();
    const value = { diagnostics: diagnosis, image_diagnostics: file };

    axios
      .post(
        `http://localhost:5000/diagnostics/create/${clinicId}/${userId}`,
        value,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((result) => console.log("Diagnosis submitted successfully"))
      .catch((error) => console.error("Error submitting diagnosis:", error));
  };

  const handleDiagnosisResult = (clinicId) => {
    axios
      .get(`http://localhost:5000/diagnostics/${clinicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setResultDiagnostics(result.data[0]))
      .catch((error) => console.error("Error fetching diagnosis:", error));
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
              <th scope="col">Booking date/time</th>
              <th scope="col">Delete Appointment</th>
              <th scope="col">Details</th>
              <th scope="col">Action</th>
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
                  <Button
                    variant="danger"
                    onClick={() =>
                      handleCancelAppointment(
                        appointment.clinic_id,
                        appointment.id
                      )
                    }
                  >
                    Cancel Appointment
                  </Button>
                </td>
                <td>{appointment.status}</td>
                <td>
                  {roleId == "2" ? (
                    <div>
                      <Button variant="secondary" onClick={handleShow}>
                        Send Diagnosis
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title className="text-capitalize">
                            The Patient's diagnosis
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form
                            onSubmit={(e) =>
                              handleFormDiagnosis(
                                appointment.clinic_id,
                                appointment.user_id,
                                e
                              )
                            }
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
                                onChange={handleDiagnosisChange}
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword"
                            >
                              <Form.Label className="fw-bold">
                                The Diagnosis Image
                              </Form.Label>
                              <Form.Control
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                              />
                            </Form.Group>
                            <Button
                              variant="primary"
                              type="submit"
                              className="float-end btn-secondary"
                              onClick={saveImage}
                            >
                              Send
                            </Button>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          handleShow();
                          handleDiagnosisResult(appointment.clinic_id);
                        }}
                      >
                        Show Diagnosis
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title className="text-capitalize">
                            Your Diagnosis Is:
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>{resultDiagnostics.diagnostics}</p>
                          <img
                            src={resultDiagnostics.image_diagnostics}
                            style={{ width: "100%", height: "100%" }}
                            alt="Diagnosis"
                          />
                        </Modal.Body>
                      </Modal>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// -----------------------

import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

<ToastContainer />

// ---------------- Notify
const notifySuccess = () => toast.success('🦄 Wow so easy!', {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
  });


  const notifyError = () => toast.error('🦄 Wow so easy!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    });
    // ---------------- Notify End


    notifySuccess();

    notifyError();

    // ----------------
    <ScrollToTop smooth />

    import ScrollToTop from "react-scroll-to-top";