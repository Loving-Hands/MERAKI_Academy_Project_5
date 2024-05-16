import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllClinic } from "../../service/redux/reducers/clinics/clinicSlice.jsx";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import { FaUserMd } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "./top-clinic.png";
import testImageDoctor from "./testImageDoctor.jpg";

import "./clinic.css";

export default function ClinicSpecialization() {
  const dispatch = useDispatch();
  const clinics = useSelector((state) => state.clinic.allClinic);
const [clinicCount, setClinicCount] = useState("")
  useEffect(() => {
    axios
      .get(`http://localhost:5000/clinic/`)
      .then((result) => {
        dispatch(setAllClinic(result.data));
        setClinicCount(result.data.length)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <>
      <section className="clinic-specialization">
        <div
          className="all-title-box"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          
        >
          
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="text-center">Clinic Specialization</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <p>
              عدد العيادات الموجوده: {clinicCount}
          </p>
      <section className="doctor container">
        {clinics.map((clinic, index) => (
          <Link to={`/infoClinic/${clinic.id}`} key={index}>
            <div className="card bg-light-subtle mt-4">
              <img
                src={clinic.image_clinic}
                className="card-img-top"
                alt="Doctor"
              />
              <div className="card-body">
                <div className="text-section">
                  <h5 className="card-title fw-bold text-capitalize">
                    <span>Clinic</span> <a href="#">{clinic.name}</a>
                  </h5>
                  <p className="card-text">Doctor {clinic.doctor_name}</p>
                  <div className="star">
                    <Rating
                      initialValue={clinic.average_rating.split(":")[0]}
                    />
                  </div>
                  <div className="more-details">
                    <span>Specialization {clinic.specialization_name}</span>
                    <ul>
                      <li>
                        <FaUserMd />
                        <span>
                          {clinic.specialization_name +
                            "," +
                            clinic.description}
                        </span>
                      </li>
                      <li>
                        <IoLocation />
                        <span>{clinic.location}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="cta-section">
                  <div className="row">
                    <div className="col-6">
                      <div className="appointment-box">
                        <h6 className="text-center">Today</h6>
                        <div className="time-info text-center">
                          <strong>From:</strong>{" "}
                          {clinic.time_open.split(":")[0]}
                          :00
                          <br />
                          <strong>To:</strong> {clinic.time_close.split(":")[0]}
                          :00
                        </div>
                        <div className="footer">
                          <button className="book-button">Book</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="appointment-box">
                        <h6 className="text-center">Tomorrow</h6>
                        <div className="time-info text-center">
                          <strong>From:</strong>{" "}
                          {clinic.time_open.split(":")[0]}
                          :00
                          <br />
                          <strong>To:</strong> {clinic.time_close.split(":")[0]}
                          :00
                        </div>
                        <div className="footer">
                          <button className="book-button">Book</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
