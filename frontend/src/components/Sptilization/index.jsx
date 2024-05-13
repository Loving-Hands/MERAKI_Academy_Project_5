import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSpatlization } from "../../service/redux/reducers/specialization/clinicSpecialization";
import { Carousel } from "react-bootstrap";
import "../Sptilization/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSearch,
  faStar,
  faCheckCircle,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

function Index() {
  const dispatch = useDispatch();
  const clinic = useSelector(
    (state) => state.clinicSpecialization.spatlization
  );
  const [currentImage, setCurrentImage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide] = useState(5);

  const images = [
    "https://media.post.rvohealth.io/wp-content/uploads/2020/08/Doctors_For_Men-732x549-thumbnail.jpg",
    "https://wp.globaluniversitysystems.com/mua/wp-content/uploads/sites/10/2023/02/istock-482499394.webp",
    "https://hms.harvard.edu/sites/default/files/media/800-Doctors-Talking-GettyImages-1421919753.jpg",
    "https://www.verywellhealth.com/thmb/Iiq1w0oRU3M7cWuewQq0-L3-fCw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1255592872-6dc47a1d2f4d4bcaba072aeac7b2118d.jpeg",
    "https://www.proteethguard.com/product_images/uploaded_images/doctor-or-dentist-for-tmj-20220319.jpg",
  ];

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
  }, [dispatch]);

  const handleSelect = (selectedIndex, e) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <div>
      <div className="image-container">
        <img
          src={images[currentImage]}
          alt={`image ${currentImage + 1}`}
          style={{ width: "100%", height: "10%", objectFit: "cover" }}
        />
      </div>
      <div className="text-container" style={{ textAlign: "center" }}>
        <h1 style={{ padding: "10px" }}>احجز كشفك حسب تخصصك</h1>
        <Carousel
          activeIndex={currentIndex}
          onSelect={handleSelect}
          style={{ margin: "0 auto", width: "80%" }}
        >
          {clinic.map((item, index) =>
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
                      >
                        <div
                          className="card"
                          style={{ width: "90%", margin: "auto" }}
                        >
                          <img
                            src={specialization.image_specialization}
                            alt={specialization.name_specialization}
                            className="card-img-top"
                            style={{ width: "100%", height: "auto" }}
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
      {/* Additional div with desired text and icons */}
      <div className="additional-info-container">
        <div
          className="additional-info"
          style={{ textAlign: "right", color: "#333" }}
        >
          <div className="info-item">
            <FontAwesomeIcon icon={faSearch} className="info-icon" />
            <span>ابحث و احجز كشف مع دكتور في عيادة أو مستشفى.</span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faStar} className="info-icon" />
            <span>تقييمات حقيقية من المرضى</span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faStar} className="info-icon" />
            <span>
              تقييمات الدكاترة من مرضى حجزوا على فيزيتا و زاروا الدكتور بالفعل.
            </span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faCheckCircle} className="info-icon" />
            <span>حجزك مؤكد مع الدكتور</span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faCheckCircle} className="info-icon" />
            <span>حجزك مؤكد بمجرد اختيارك من المواعيد المتاحة للدكتور.</span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faMoneyBill} className="info-icon" />
            <span>احجز مجاناً، و ادفع في العيادة</span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faMoneyBill} className="info-icon" />
            <span>
              سعر الكشف على فيزيتا نفس سعر الكشف في العيادة، بدون أي مصاريف
              إضافية.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
