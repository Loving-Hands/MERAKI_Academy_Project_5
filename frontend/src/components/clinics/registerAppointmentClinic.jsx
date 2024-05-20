import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RegisterAppointmentClinic() {
  const [doctor, setDoctor] = useState({});
  const [timeDate, setTimeDate] = useState("");

  const [urgent, setUrgent] = useState("No");

  const { id } = useParams();
  const currentDate = new Date();
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));
  console.log(token);

  const handleSetUrgent = (value) => {
    setUrgent(value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clinic/info/${id}`)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor information:", error);
      });
  }, [id]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const appointmentData = {
      date_time: timeDate,
      status: urgent,
    };
    axios
      .post(`http://localhost:5000/appointment/${id}/`, appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);
      })
      .catch(
        (error) => {
          console.error("Error booking appointment:", error);
        },
        [id]
      );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="uniqueAppointment-main-wrapper">
            <div className="uniqueAppointment-form-wrapper">
              <form onSubmit={handleSubmitForm}>
                <label htmlFor="">Choose Your Time</label>
                <div className="form-group">
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={timeDate}
                    onChange={(e) => setTimeDate(e.target.value)}
                    min={`${currentDate.toISOString().split("T")[0]}T${
                      doctor.time_open || ""
                    }`}
                    max={`${currentDate.toISOString().split("T")[0]}T${
                      doctor.time_close || ""
                    }`}
                  />
                </div>
                <>
                  <h2>Urgent Appointment</h2>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="btnradio1"
                      autoComplete="off"
                      checked={urgent === "No"}
                      onChange={() => handleSetUrgent("No")}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btnradio1"
                    >
                      No
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="btnradio2"
                      autoComplete="off"
                      checked={urgent === "Yes"}
                      onChange={() => handleSetUrgent("Yes")}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btnradio2"
                    >
                      Yes
                    </label>
                  </div>
                </>

                <div>
                  <div className="d-flex justify-content-center">
                    <button className="uniqueAppointment-btn" type="submit">
                      Book Now
                    </button>
                  </div>
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
                alt="Clinic"
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
