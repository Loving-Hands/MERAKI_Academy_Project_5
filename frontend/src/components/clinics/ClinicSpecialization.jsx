import React from "react";
import "./clinic.css";
import backgroundImage from "./top-clinic.png";
export default function ClinicSpecialization() {
  return (
    <>
      <section className="clinic-specialization">
        <div
          className="all-title-box"
          style={{ backgroundImage: `url(${backgroundImage}) ` }}
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
      <section className="doctor">
        <div className="doctorCard">
          <div className="preview-card">
            <div className="preview-card__wrp">
              <div
                className="preview-card__item"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="preview-card__img">
                  <img
                    src="https://res.cloudinary.com/muhammederdem/image/upload/v1535759872/kuldar-kalvik-799168-unsplash.jpg"
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "20px",
                    }}
                  />
                  <div></div>
                </div>
                <div className="preview-card__content">
                  <span
                    className="preview-card__code"
                    style={{
                      color: "#7b7992",
                      fontWeight: "500",
                      marginBottom: "15px",
                      display: "block",
                    }}
                  >
                    26 December 2019
                  </span>
                  <div
                    className="preview-card__title"
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#0d0925",
                      marginBottom: "20px",
                    }}
                  >
                    Lorem Ipsum Dolor
                  </div>
                  <div
                    className="preview-card__text"
                    style={{
                      color: "#4e4a67",
                      marginBottom: "30px",
                      lineHeight: "1.5em",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Recusandae voluptate repellendus magni illo ea animi?
                  </div>
                  <a href="#" className="preview-card__button">
                    READ MORE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
