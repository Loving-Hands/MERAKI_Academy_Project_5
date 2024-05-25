import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSpatlization } from "../../service/redux/reducers/specialization/clinicSpecialization";
import { Carousel } from "react-bootstrap";
import "../Sptilization/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiHandshakeThin } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  faSearch,
  faStar,
  faCheckCircle,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { setSpatlizationById } from "../../service/redux/reducers/specialization/clinicSptlizationById";
import { Link, useNavigate } from "react-router-dom";
import image1 from "./imageSlider/1.jpg";
import image2 from "./imageSlider/2.jpg";
import image3 from "./imageSlider/3.jpg";
import image4 from "./imageSlider/4.jpg";
import ScrollToTop from "react-scroll-to-top";

function Index() {
  const [searchItem, setSearchItem] = useState("");

  const dispatch = useDispatch();
  const clinic = useSelector(
    (state) => state.clinicSpecialization.spatlization
  );

  const clinicSptlization = useSelector(
    (state) => state.clinicSptlizationById.setSpatlizationById
  );
  const [currentImage, setCurrentImage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide] = useState(4);
  const navigate = useNavigate();
  const images = [image2, image1, image4, image3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        currentImage === images.length - 1 ? 0 : currentImage + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/specialization/")
      .then((res) => {
        dispatch(setSpatlization(res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setCurrentIndex(selectedIndex);
  };
  const handleSpecializationClick = (id) => {
    navigate(`/specialization/${id}`);
  };

  return (
    <>
      <ScrollToTop smooth />
      <div>
        <div className="image-container">
          <img
            src={images[currentImage]}
            alt={`image ${currentImage + 1}`}
            style={{ height: "80vh", width: "100%" }}
          />
        </div>
        <div
          className="text-container"
          style={{ textAlign: "center", margin: "40px" }}
        >
          <h1 style={{ padding: "10px" }} className="text-capitalize">
            Book from top specialties
          </h1>
          <Carousel
            activeIndex={currentIndex}
            onSelect={handleSelect}
            style={{ margin: "0 auto", width: "80%" }}
          >
            {clinic &&
              clinic.map((item, index) =>
                index % itemsPerSlide === 0 ? (
                  <Carousel.Item key={index}>
                    <div className="d-flex justify-content-between">
                      {clinic
                        .slice(index, index + itemsPerSlide)
                        .map((specialization, subIndex) => (
                          <div
                            key={subIndex}
                            className="text-center"
                            style={{ width: "30%" }}
                            onClick={() =>
                              handleSpecializationClick(specialization.id)
                            }
                          >
                            <div
                              className="card"
                              style={{ width: "90%", margin: "auto" }}
                            >
                              <img
                                src={specialization.image_specialization}
                                alt={specialization.name_specialization}
                                className="card-img-top"
                                style={{ width: "100%", minHeight: "300px" }}
                              />
                              <div className="card-body">
                                <h5 className="card-title">
                                  {specialization.name_specialization}
                                </h5>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Carousel.Item>
                ) : null
              )}
          </Carousel>
        </div>

        <div className="rating">
          <div className="container">
            <div className="row pt-5 pb-5">
              <div className="col-3">
                <div className="text-center">
                  <img src="https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/58776/_next/static/images/medical-care-icon.svg"></img>
                </div>
                <h3 style={{ lineHeight: "1.2", paddingTop: "20px" }}>
                  All your healthcare needs
                </h3>
                <h5 style={{ lineHeight: "1.3" }}>
                  Search for and book a doctor's appointment, either in a clinic
                  or hospital.
                </h5>
              </div>
              <div className="col-3">
                <div className="text-center">
                  <img src="https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/58776/_next/static/images/doctor-icon.svg" />
                </div>
                <h3 style={{ lineHeight: "1.2", paddingTop: "20px" }}>
                  Verified patient reviews
                </h3>
                <h5 style={{ lineHeight: "1.3" }}>
                  Doctor ratings are from patients who booked and visited the
                  doctor through Vezeeta.
                </h5>
              </div>
              <div className="col-3">
                <div className="text-center">
                  <img src="https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/58776/_next/static/images/booking-icon.svg" />
                </div>
                <h3 style={{ lineHeight: "1.2", paddingTop: "20px" }}>
                  Your booking is confirmed
                </h3>
                <h5 style={{ lineHeight: "1.3" }}>
                  {" "}
                  Your booking is automatically confirmed, as the doctor
                  specifies his working hours and is notified of the booking
                  details.
                </h5>
              </div>
              <div className="col-3">
                <div className="text-center">
                  <img src="https://d1aovdz1i2nnak.cloudfront.net/vezeeta-web-reactjs/58776/_next/static/images/security-icon.svg"></img>
                </div>
                <h3 style={{ lineHeight: "1.2", paddingTop: "20px" }}>
                  Book for free, and pay in the clinic
                </h3>
                <h5 style={{ lineHeight: "1.3" }}>
                  The consultation fees stated on Vezeeta are the actual
                  doctor's fees with no extra charges.
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="rating ra">
          <div className="container">
            <div className="row pt-5 pb-5">
              <div className="col-lg-6 col-md-12">
                <div className="customCategory">
                  <h3 className="text-capitalize">
                    Choose and book from top specialties
                  </h3>
                  {clinic &&
                    clinic.map((clinic) => (
                      <Link
                        key={clinic.id}
                        style={{ margin: "10px" }}
                        onClick={() => {
                          navigate(`/specialization/${clinic.id}`);
                        }}
                      >
                        {clinic.name_specialization}
                      </Link>
                    ))}
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="text-center customCategory">
                  <h3 className="text-capitalize">
                    {" "}
                    Choose and book from top cities
                  </h3>
                  <a href="#" style={{ margin: "10px" }}>
                    Amman
                  </a>
                  <a href="#" style={{ margin: "10px" }}>
                    Irbid
                  </a>
                  <a href="#" style={{ margin: "10px" }}>
                    Zarqa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
