import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import  {setSpatlization}  from "../../service/redux/reducers/specialization/clinicSpecialization";
import { Carousel } from "react-bootstrap";
import "../Sptilization/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiHandshakeThin } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import {
  faSearch,
  faStar,
  faCheckCircle,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { setSpatlizationById } from "../../service/redux/reducers/specialization/clinicSptlizationById";
import { useNavigate } from "react-router-dom";

function Index() {
  const dispatch = useDispatch();
  const clinic = useSelector(
    (state) => state.clinicSpecialization.spatlization
  );
  const clinicSptlization=useSelector(state=> state.clinicSptlizationById.setSpatlizationById)
  const [currentImage, setCurrentImage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide] = useState(4);
  const navigate=useNavigate();
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
  const handleSpecializationClick = (id) => {
    navigate(`/specialization/${id}`);
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
                        onClick={() => handleSpecializationClick(specialization.id)}
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
      
      <div className="rating">
       <div className="container">
       <div className="row pt-5 pb-5">
            <div className="col-3">
<div className="text-center"><PiHandshakeThin size={64}/></div>
<h3>كل احتياجاتك على فيزيتا</h3>
<h5>ابحث و احجز كشف مع دكتور في عيادة أو مستشفى.</h5>
            </div>
            <div className="col-3">
<div className="text-center" ><IoPersonSharp size={64} /></div>
<h3>تقييمات حقيقية من المرضى</h3>
<h5>تقييمات الدكاترة من مرضى حجزوا على فيزيتا و زاروا الدكتور بالفعل.</h5>
            </div>
            <div className="col-3">
<div className="text-center"><SlCalender size={64}/></div>
<h3>حجزك مؤكد مع الدكتور</h3>
<h5> حجزك مؤكد بمجرد اختيارك من المواعيد المتاحة للدكتور. </h5>
            </div>
            <div className="col-3">
<div className="text-center"><RiSecurePaymentLine size={64}/></div>
<h3>كل احتياجاتك على فيزيتا</h3>
<h5>ابحث و احجز كشف مع دكتور في عيادة أو مستشفى.</h5>
            </div>
        </div>
       </div>
      </div>
      <div className="rating ra">
  <div className="container">
    <div className="row pt-5 pb-5">
      <div className="col-lg-6 col-md-12">
        <div className="text-center">
          <h3>إختار التخصص وإحجز كشف دكتور</h3>
          <a href="#">دكتور جلدية</a>
          <a href="#" style={{ marginRight: "10px" }}>دكتور اسنان</a>
          <a href="#" style={{ marginRight: "10px" }}>دكتور نفسي</a>
          <a href="#" style={{ marginRight: "10px" }}>دكتور اطفال وحديثي الولادة</a>
        </div>
      </div>
      <div className="col-lg-6 col-md-12">
        <div className="text-center">
          <h3> المدينة وإحجز كشف دكتور</h3>
          <a href="#">عمان</a>
          <a href="#" style={{ marginRight: "10px" }}>اربد</a>
          <a href="#" style={{ marginRight: "10px" }}>الزرقا</a>
        </div>
      </div>
    </div>
  </div>
</div>
<footer className="footer mt-auto py-3 bg-primary text-white">
  <div className="container">
    <div className="row">
      <div className="col-md-3">
        <h5 className="text-white">vezeeta-logo</h5>
        <div>          <FaFacebook style={{ marginRight: '10px' }} />
             <FaInstagram style={{ marginRight: '10px' }} />
              <FaTwitter />
                                        </div>  </div>
      <div className="col-md-3">
        <h5 className="text-white">من نحن</h5>
        <ul className="list-unstyled text-white">
          <li><a href="#" className="text-white">فريق فيزيتا</a></li>
          <li><a href="#" className="text-white">وظائف</a></li>
          <li><a href="#" className="text-white">الصحافة</a></li>
        </ul>
      </div>
      <div className="col-md-3">
        <h5 className="text-white">ابحث عن طريق</h5>
        <ul className="list-unstyled text-white">
          <li><a href="#" className="text-white">التخصص</a></li>
          <li><a href="#" className="text-white">المنطقة</a></li>
          <li><a href="#" className="text-white">التأمين</a></li>
          <li><a href="#" className="text-white">المستشفى</a></li>
          <li><a href="#" className="text-white">المركز</a></li>
        </ul>
      </div>
      <div className="col-md-3">
        <h5 className="text-white">هل أنت طبيب ؟</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white">انضم الى أطباء فيزيتا</a></li>
        </ul>
        <h5 className="text-white">تحتاج للمساعدة ؟</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white">مكتبة طبية</a></li>
          <li><a href="#" className="text-white">اتصل بنا</a></li>
          <li><a href="#" className="text-white">شروط الاستخدام</a></li>
          <li><a href="#" className="text-white">اتفاقية الخصوصية</a></li>
          <li><a href="#" className="text-white">اتفاقية الخصوصية للأطباء</a></li>
        </ul>
      </div>
    </div>
    <hr />
    <div className="text-center">
      <p>&copy; {new Date().getFullYear()} LovingHands</p>
    </div>
  </div>
</footer>

    </div>
  );
}

export default Index;
