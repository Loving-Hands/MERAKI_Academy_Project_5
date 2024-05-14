import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
                <h2 className="text-center">Clinic Specialization</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info_clinic container">
        <div className="row">
          <div className="col-7">
            {clinicData && (
              <div className="card dark" key={clinicData.id}>
                <img
                  src={clinicData.image_clinic}
                  className="card-img-top"
                  alt="Clinic"
                />
                <div className="card-body">
                  <div className="text-section">
                    <h5 className="card-title">{clinicData.name}</h5>
                    <p className="card-text">{clinicData.description}</p>
                  </div>
                  <div className="cta-section">
                    <div>${clinicData.price}</div>
                    <a href="#" className="btn btn-light">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-5">
            {clinicData && (
              <div>
                <h3>Location</h3>
                <p>{clinicData.location}</p>
                <h3>Opening Hours</h3>
                <p>
                  {clinicData.time_open} - {clinicData.time_close}
                </p>
                <h3>Open Days</h3>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
