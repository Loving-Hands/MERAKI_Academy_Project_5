import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { BsQuestionSquare } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";

import backgroundImage from "./top-clinic.png";

export default function InfoClinic() {
  const { id } = useParams();
  const [clinicData, setClinicData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clinic/info/${id}`)
      .then((result) => {
        setClinicData(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
                <h2 className="text-center text-capitalize">
                  {clinicData.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info_clinic container">
        <div className="row">
          <div className="col-lg-7">
            {clinicData && (
              <>
                <div className="card dark" key={clinicData.id}>
                  <img
                    src={clinicData.doctor_image}
                    className="card-img-top"
                    alt="Clinic"
                  />
                  <div className="card-body">
                    <div className="text-section">
                      <h5 className="card-title">
                        Doctor {clinicData.doctor_name}
                      </h5>
                      <p className="card-text">
                        {clinicData.name_specialization}
                      </p>
                      <p className="text-capitalize">
                        {clinicData.description}
                      </p>
                      <div className="star">
                        <Rating initialValue={clinicData.avg_rating} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card dark doctorInformation">
                  <div className="card-body">
                    <div className="text-section">
                      <BsQuestionSquare size={30} />
                      <span className="text-capitalize p-2">
                        Information about Doctor
                      </span>
                      <p className="p-4 text-capitalize">
                        {clinicData.long_description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card dark imageClinic">
                  <div className="card-body">
                    <div className="text-section">
                      <CiImageOn size={30} />{" "}
                      <span className="text-capitalize p-2">Image Clinic</span>
                      <div className="img-clinic">
                        <img src={clinicData.image_clinic} alt="Clinic" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="col-lg-5 information_appointment">
            <div className="card">
              <div className="card-head">
                <p className="text-center text-capitalize">
                  Information Appointment
                </p>
              </div>
              <div className="card-body-appintment">
                <p className="text-center">
                  Book <br />A medical
                </p>
                <hr />
                <div className="text-center text-capitalize">
                  <IoLocation />
                  <span>
                    {clinicData.location} <br />{" "}
                    <span className="appointspan">appintment now</span>
                  </span>
                </div>
                <hr />
                <h5 className="text-center text-capitalize">
                  choose Appointment now
                </h5>
                <div className="row edit-width">
                  <div className="col-6">
                    <div className="appointment-box">
                      <h6 className="text-center">Today</h6>
                      <div className="time-info text-center">
                        <strong>From:</strong>
                        {clinicData.time_open}
                        <br />
                        <strong>To:</strong> {clinicData.time_close}
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
                        <strong>From:</strong>
                        {clinicData.time_open}
                        <br />
                        <strong>To:</strong> {clinicData.time_close}
                      </div>
                      <div className="footer">
                        <button className="book-button">Book</button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="signInNow text-center text-capitalize">
                  <p>sign in for first</p>
                </div>
              </div>
              <div className="card-footer text-capitalize text-center">
                <FaCalendarAlt size={25} />
                appointment online <br /> now and bay in clinic
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
