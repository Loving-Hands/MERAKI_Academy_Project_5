import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaClock } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";

export default function RegisterAppointmentClinic() {
  const [doctor, setDoctor] = useState({});
  const [dateFrom, setDate] = useState("");
  const [timeFrom, setTime] = useState("");
  const [urgent, setUrgent] = useState("No");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  const handleSetUrgent = (value) => {
    setUrgent(value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clinic/info/${id}`)
      .then((response) => {
        setDoctor(response.data);

        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching doctor information.");
        setLoading(false);
        console.error("Error fetching doctor information:", error);
      });
  }, [id]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const appointmentData = {
      time: timeFrom,
      date: dateFrom,
      status: urgent,
    };

    axios
      .post(`http://localhost:5000/appointment/${id}/`, appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Appointment booked successfully.");
        console.log("Appointment booked successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
      });
  };

  // const closingTimeParts = clinicDetails.time_close.split(":");
  // const closingTime = closingTimeParts[0] + ":" + closingTimeParts[1];

  // const openingTimeParts = clinicDetails.time_open.split(":");
  // const openingTime = openingTimeParts[0] + ":" + openingTimeParts[1];
  // const formattedOpenDays = clinicDetails.open_days.join("/");
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="uniqueAppointment-main-wrapper">
            <div className="uniqueAppointment-form-wrapper">
              <form onSubmit={handleSubmitForm}>
                <label htmlFor="appointment-time">Choose Your Time</label>
                <p className="text-capitalize fw-bold">
                  <FaClock />
                  clinic open between:
                </p>
                <p className="text-capitalize fw-bold">
                  <FaCalendarDays /> clinic Days Opening :
                </p>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    id="appointment-time"
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <input
                    type="time"
                    className="form-control"
                    id="appointment-time"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div>
                  <h2>Urgent Appointment</h2>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Urgent appointment options"
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="urgent-radio"
                      id="urgent-no"
                      autoComplete="off"
                      checked={urgent === "No"}
                      onChange={() => handleSetUrgent("No")}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="urgent-no"
                    >
                      No
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="urgent-radio"
                      id="urgent-yes"
                      autoComplete="off"
                      checked={urgent === "Yes"}
                      onChange={() => handleSetUrgent("Yes")}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="urgent-yes"
                    >
                      Yes
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="uniqueAppointment-btn" type="submit">
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="info_clinic">
            <div className="uniqueAppointment-main-wrapper" key={doctor.id}>
              <img
                src={doctor.doctor_image}
                className="card-img-top"
                alt="Doctor"
              />
              <div className="card-body">
                <div className="text-section">
                  <h5 className="card-title">Doctor {doctor.doctor_name}</h5>
                  <p className="card-text">{doctor.name_specialization}</p>
                  <p className="text-capitalize">{doctor.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
