import React, { useState } from "react";
import { Routes, Route, useNavigate, Link, useParams } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { FaUserMd } from "react-icons/fa";
import { Rating } from "react-simple-star-rating";
import backgroundImage from "./top-clinic.png";
import testImageDoctor from "./testImageDoctor.jpg";
import "./clinic.css";

export default function ClinicSpecialization() {
  const [rating, setRating] = useState(1);

  const handleRating = (rating) => {
    setRating(rating);
    console.log(rating);
  };

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
      <Link to="/page-doctor">
        <section className="doctor container">
          <div className="card bg-light-subtle mt-4">
            <img src={testImageDoctor} className="card-img-top" alt="Doctor" />
            <div className="card-body">
              <div className="text-section">
                <h5 className="card-title fw-bold text-capitalize">
                  <span>Doctor</span> <a href="#">Jamal Khalil</a>
                </h5>
                <p className="card-text">Dentist</p>
                <div className="star">
                  <Rating onClick={handleRating} />
                </div>
                <div className="more-details">
                  <span>Joined Recently</span>
                  <ul>
                    <li>
                      <FaUserMd />
                      <span>Dentist Specialized in Cosmetic Dentistry</span>
                    </li>
                    <li>
                      <IoLocation />
                      <span>Khaldi Street, Ibn Khaldon</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="cta-section">
                <div className="row">
                  <div className="col-4">
                    <div className="appointment-box">
                      <h6 className="text-center">Today</h6>
                      <div className="time-info text-center">
                        <strong>From:</strong> 9:00 AM
                        <br />
                        <strong>To:</strong> 6:00 PM
                      </div>
                      <div className="footer">
                        <button className="book-button">Book</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="appointment-box">
                      <h6 className="text-center">Tomorrow</h6>
                      <div className="time-info text-center">
                        <strong>From:</strong> 9:00 AM
                        <br />
                        <strong>To:</strong> 6:00 PM
                      </div>
                      <div className="footer">
                        <button className="book-button">Book</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="appointment-box">
                      <h6 className="text-center">Date</h6>
                      <div className="time-info text-center">
                        <strong>From:</strong> 9:00 AM
                        <br />
                        <strong>To:</strong> 6:00 PM
                      </div>
                      <div className="footer">
                        <button className="book-button ">Book</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Link>
    </>
  );
}
