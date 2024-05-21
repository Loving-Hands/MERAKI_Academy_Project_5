import React, { useState, useCallback } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { setLogout } from "../../service/redux/reducers/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {setSpatlization} from "../../service/redux/reducers/specialization/clinicSpecialization"
import logo from "./Logo.png";
import debounce from "lodash.debounce";
import axios from "axios";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role, username } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    role: state.auth.role,
    username: state.auth.username,
  }));

  const { t, i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    axios
      .post("http://localhost:5000/clinic/search", { query })
      .then((response) => {
        console.log(response.data);
        dispatch(setSpatlization(response.data))
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedHandleSearch(query);
  };

  const handleSpecializationClick = (id) => {
console.log(id)
    navigate(`/user/${id}`);
  };
  const handleGoToAppointment = (id) => {
    navigate(`appointment/user/${id}}`);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#1787e0" }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link to="/" className="navbar-brand">
            <img src={logo} style={{ width: "130px" }} alt="Logo" />
          </Link>

          <form className="d-flex mx-auto">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder={t("Search")}
                aria-label="Search"
                style={{ width: "250px" }}
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <div className="d-flex align-items-center">
            {isLoggedIn && role === 1 && (
              <div className="dropdown me-2">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    backgroundColor: "#1787e0",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  {username}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  style={{ backgroundColor: "#1787e0", color: "#fff" }}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      style={{ backgroundColor: "#1787e0", color: "#fff" }}
                      onClick={handleGoToAppointment}
                    >
                      {t("My Appointments")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      style={{ backgroundColor: "#1787e0", color: "#fff" }}
                      onClick={() => {
                        console.log("Logout button clicked");
                        dispatch(setLogout());
                      }}
                    >
                      {t("Logout")}
                    </button>
                  </li>
                  <button
                    className="dropdown-item"
                    style={{ backgroundColor: "#1787e0", color: "#fff" }}
                    onClick={handleSpecializationClick()}
                  >
                    {t("Bayaniati")}
                  </button>
                </ul>
              </div>
            )}

            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  {t("Login")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  {t("Register")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contactus" className="nav-link">
                  {t("Contact Us")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/allClinics" className="nav-link">
                  {t("Clinics")}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;