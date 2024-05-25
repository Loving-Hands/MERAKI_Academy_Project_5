import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { FaUserMd } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import backgroundImage from "../components/clinics/top-clinic.png";
import ScrollToTop from "react-scroll-to-top";

export default function SpecializationDetails() {
  const [clinics, setClinics] = useState([]);
  const { id } = useParams();
  const [clinicCount, setClinicCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clinic/${id}`)
      .then((res) => {
        setClinics(res.data);
        setClinicCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <section
        className="clinic-specialization"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "100% auto",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="text-center">
                قائمة الأطباء والعيادات لهذا التخصص
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="doctor container">
        <p className="text-center">عدد الاطباء المتاحين :{clinicCount}</p>
        {clinics.map((clinic) => (
          <div className="card bg-light-subtle mt-4" key={clinic.id}>
            <img
              src={clinic.image_clinic}
              className="card-img-top"
              alt={clinic.name}
              style={{ width: "200px", height: "auto" }}
            />
            <div className="card-body">
              <div className="text-section">
                <h5 className="card-title fw-bold text-capitalize">
                  <span>Clinic</span> {clinic.name}
                </h5>
                <p className="card-text">Doctor {clinic.doctor_name}</p>
                <div className="star">
                  {clinic.average_rating && (
                    <Rating
                      initialValue={clinic.average_rating.split(":")[0]}
                    />
                  )}
                </div>
                <div className="more-details">
                  <ul>
                    <li>
                      <FaUserMd />
                      <span>
                        {clinic.specialization_name}, {clinic.description}
                      </span>
                    </li>
                    <li>
                      <IoLocation />
                      <span>{clinic.location}</span>
                    </li>
                    <li>أيام العمل: {clinic.open_days.join(", ")}</li>
                    <li>وقت الفتح: {clinic.time_open}</li>
                    <li>وقت الإغلاق: {clinic.time_close}</li>
                  </ul>
                </div>
              </div>
              <div className="cta-section">
                <div className="row">
                  <div className="col-6">
                    <div className="appointment-box">
                      <h6 className="text-center">Today</h6>
                      <div className="time-info text-center">
                        <strong>From:</strong> {clinic.time_open.split(":")[0]}
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
                        <strong>From:</strong> {clinic.time_open.split(":")[0]}
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
        ))}
      </section>
      <ScrollToTop smooth />
    </>
  );
}
