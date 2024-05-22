import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaClock } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";

export default function RegisterAppointmentClinic() {
  const [doctor, setDoctor] = useState({});
<<<<<<< HEAD
  const [timeDate, setTimeDate] = useState("");
  const [urgent, setUrgent] = useState("No");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clinicDetails, setClinicDetails] = useState({
    time_open: "08:00",
    time_close: "16:00",
    open_days: [],
  });

  const { id } = useParams();
  const currentDate = new Date();
  const dateRange = [];

  for (let i = 0; i < 4; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    dateRange.push(date);
  }
=======
  const [dateFrom, setDate] = useState("");
  const [timeFrom, setTime] = useState("");
  const [urgent, setUrgent] = useState("No");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
>>>>>>> befb749df5687171cb392792cc6a38272e4605d4

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
<<<<<<< HEAD
        setClinicDetails({
          time_open: response.data.time_open,
          time_close: response.data.time_close,
          open_days: response.data.open_days,
        });
=======

>>>>>>> befb749df5687171cb392792cc6a38272e4605d4
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

    if (!timeDate) {
      alert("Please select a date and time for your appointment.");
      return;
    }

    if (!token) {
      alert("You need to be logged in to book an appointment.");
      return;
    }

    const appointmentDate = new Date(timeDate);
    const appointmentDay = appointmentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (!clinicDetails.open_days.includes(appointmentDay)) {
      alert(
        `The clinic is closed on ${appointmentDay}s. Please select another day.`
      );
      return;
    }

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
<<<<<<< HEAD
        alert("Error booking appointment.");
=======
>>>>>>> befb749df5687171cb392792cc6a38272e4605d4
        console.error("Error booking appointment:", error);
      });
  };

<<<<<<< HEAD
  const closingTimeParts = clinicDetails.time_close.split(":");
  const closingTime = closingTimeParts[0] + ":" + closingTimeParts[1];

  const openingTimeParts = clinicDetails.time_open.split(":");
  const openingTime = openingTimeParts[0] + ":" + openingTimeParts[1];
  const formattedOpenDays = clinicDetails.open_days.join("/");
  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="uniqueAppointment-main-wrapper">
              <div className="uniqueAppointment-form-wrapper">
                <form onSubmit={handleSubmitForm}>
                  <label htmlFor="appointment-time">Choose Your Time</label>
                  <p className="text-capitalize fw-bold">
                    <FaClock />
                    clinic open between: {openingTime}, {closingTime}
                  </p>
                  <p className="text-capitalize fw-bold">
                    <FaCalendarDays /> clinic Days Opening : {formattedOpenDays}
                  </p>
                  <div className="form-group">
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="appointment-time"
                      value={timeDate}
                      onChange={(e) => setTimeDate(e.target.value)}
                      min={`${currentDate.toISOString().split("T")[0]}T${
                        clinicDetails.time_open
                      }`}
                      max={`${dateRange[3].toISOString().split("T")[0]}T${
                        clinicDetails.time_close
                      }`}
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
=======
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
>>>>>>> befb749df5687171cb392792cc6a38272e4605d4
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
