import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import logo from "./Logo6.png";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [searchItem, setSearchItem] = useState("");

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    //window.location.reload();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#1787e0" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <div className="customLogo">
          <NavLink to="/" className="navbar-brand mr-auto ">
            <img src={logo} style={{ width: "130px", height: "20px" }}></img>
          </NavLink>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: "250px" }}
          />
        </form>
        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                {t("تسجيل الدخول")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                {t("التسجيل")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contactus" className="nav-link">
                {t("اتصل بنا")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/allClinics" className="nav-link">
                {t("العيادات")}
              </NavLink>
            </li>
          </ul>
        </div>
        <h1>{t("Welcome to React")}</h1>
        <div>
          <button onClick={() => changeLanguage("en")}>en</button>
          <button onClick={() => changeLanguage("ar")}>ar</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
