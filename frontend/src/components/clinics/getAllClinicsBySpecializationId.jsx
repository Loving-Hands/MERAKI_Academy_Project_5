import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { FaUserMd } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import backgroundImage from "./top-clinic.png";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

export default function SpecializationDetails() {
  const [clinics, setClinics] = useState([]);
  const { id } = useParams();
  const [clinicCount, setClinicCount] = useState(0);
  const [specializationName, setSpecializationName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clinicPage = 5;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clinic/${id}`)
      .then((res) => {
        console.log(res.data);
        setClinics(res.data);
        setClinicCount(res.data.length);
        if (res.data.length > 0) {
          setSpecializationName(res.data[0].specialization_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const indexLastPage = currentPage * clinicPage;
  const indexFirstClinic = indexLastPage - clinicPage;
  const currentClinics = clinics.slice(indexFirstClinic, indexLastPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <ScrollToTop smooth />
      <section className="clinic-specialization">
        <div
          className="all-title-box"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="text-center">Clinics {specializationName}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container text-center p-5">
        <h4 className="countClinics ">Avaliable Clinics ({clinicCount})</h4>
      </div>
      <section className="doctor container">
        {currentClinics.map((clinic, index) => (
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
                  <p className="card-text">Dr. {clinic.doctor_name}</p>
                  <div className="star">
                    <Rating initialValue={clinic.average_rating} />
                  </div>
                  <div className="more-details">
                    <span>Specialization {clinic.specialization_name}</span>
                    <ul>
                      <li>
                        <FaUserMd />
                        <span>
                          {clinic.specialization_name +
                            ", " +
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
                          <strong>From:</strong>
                          {clinic.time_open.split(":")[0]}:00
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
                          {clinic.time_open.split(":")[0]}:00
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
        <nav>
          <ul className="pagination justify-content-center mt-4">
            {[...Array(Math.ceil(clinicCount / clinicPage)).keys()].map(
              (number) => (
                <li key={number + 1} className="page-item">
                  <button
                    onClick={() => paginate(number + 1)}
                    className="page-link"
                  >
                    {number + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </section>
    </>
  );
}
