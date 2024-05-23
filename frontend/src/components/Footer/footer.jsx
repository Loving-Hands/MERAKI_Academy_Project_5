import React from "react";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function footer() {
  return (
    <div>
      <footer className="footer mt-auto py-3 bg-primary text-white customFooter">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5 className="text-white">vezeeta-logo</h5>
              <div>
                {" "}
                <FaFacebook style={{ marginRight: "10px" }} />
                <FaInstagram style={{ marginRight: "10px" }} />
                <FaTwitter />
              </div>{" "}
            </div>
            <div className="col-md-3">
              <h5 className="text-white">من نحن</h5>
              <ul className="list-unstyled text-white">
                <li>
                  <a href="#" className="text-white">
                    فريق فيزيتا
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    وظائف
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    الصحافة
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="text-white">ابحث عن طريق</h5>
              <ul className="list-unstyled text-white">
                <li>
                  <a href="#" className="text-white">
                    التخصص
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    المنطقة
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    التأمين
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    المستشفى
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    المركز
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="text-white">هل أنت طبيب ؟</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    انضم الى أطباء فيزيتا
                  </a>
                </li>
              </ul>
              <h5 className="text-white">تحتاج للمساعدة ؟</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    مكتبة طبية
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    اتصل بنا
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    شروط الاستخدام
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    اتفاقية الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    اتفاقية الخصوصية للأطباء
                  </a>
                </li>
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
