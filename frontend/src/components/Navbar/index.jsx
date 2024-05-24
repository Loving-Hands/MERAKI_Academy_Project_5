import React, { useState, useCallback } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { setLogout } from "../../service/redux/reducers/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "./Logo.png";
import debounce from "lodash.debounce";
import axios from "axios";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role, username, docName } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    role: state.auth.role,
    username: state.auth.username,
    docName: state.doc.docName,
  }));

  const roleId = localStorage.getItem("roleId");
  const userId = localStorage.getItem("userId");

  const { t, i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    axios
      .post("http://localhost:5000/clinic/search", { query })
      .then((response) => {
        setSearchResults(response.data);
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
    navigate(`/user/${id}`);
  };

  const handleGoToAppointment = (id) => {
    navigate(`appointment/user/${id}`);
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
              <div className="input-group-append">
                <button
                  className="btn btn-outline-light"
                  type="button"
                  onClick={() => handleSearch(searchQuery)}
                >
                  {t("Search")}
                </button>
              </div>
            </div>
          </form>

          <div className="d-flex align-items-center">
            {(isLoggedIn && roleId == 1) || roleId == 2 ? (
              <div className="dropdown me-2">
                <button
                  className="btn btn-secondary dropdown-toggle text-uppercase"
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
                      onClick={() => handleGoToAppointment(roleId)}
                    >
                      {t("My Appointments")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      style={{ backgroundColor: "#1787e0", color: "#fff" }}
                      onClick={() => {
                        dispatch(setLogout());
                        navigate("/");
                      }}
                    >
                      {t("Logout")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      style={{ backgroundColor: "#1787e0", color: "#fff" }}
                      onClick={() => handleSpecializationClick(userId)}
                    >
                      {t("Bayaniati")}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
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
              </ul>
            )}
            <ul className="navbar-nav d-flex align-items-center">
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
        {searchResults.length > 0 && (
          <div className="search-results">
            <ul>
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  onClick={() => navigate(`/clinic/${result.id}`)}
                >
                  {result.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;