import React, { useState, useEffect, useCallback } from "react";
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
  const { isLoggedIn, username, docName } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    username: state.auth.username,
    docName: state.doc.docName,
  }));

  const roleId = localStorage.getItem("roleId");
  const userId = localStorage.getItem("userId");

  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    switch (roleId) {
      case "1":
        setFullname(username);
        break;
      case "2":
        setFullname(docName);
        break;
      case "3":
        setFullname(username);
        break;
      default:
        setFullname("");
    }
  }, [username, docName, roleId]);

  const handleLoginSuccess = () => {
    setFullname(username);
  };

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

  const handleGoToAppointment = () => {
    navigate(`/appointment/user/${userId}`);
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleAdminDashboardClick = () => {
    navigate("/adminDashboard");
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1787e0" }}>
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
                <button className="btn btn-outline-light" type="button" onClick={() => handleSearch(searchQuery)}>
                  {t("Search")}
                </button>
              </div>
            </div>
          </form>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <div className="dropdown me-2">
                <button
                  className="btn btn-secondary dropdown-toggle text-uppercase"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={showDropdown}
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    backgroundColor: "#1787e0",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  {fullname}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  style={{ backgroundColor: "#1787e0", color: "#fff" }}
                >
                  {roleId === "1" && (
                    <>
                      <li>
                        <button className="dropdown-item" style={{ backgroundColor: "#1787e0", color: "#fff" }} onClick={handleGoToAppointment}>
                          {t("My Appointments")}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" style={{ backgroundColor: "#1787e0", color: "#fff" }} onClick={() => handleSpecializationClick(userId)}>
                          {t("Bayaniati")}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" style={{ backgroundColor: "#1787e0", color: "#fff" }} onClick={handleLogout}>
                          {t("Logout")}
                        </button>
                      </li>
                    </>
                  )}
                  {roleId === "2" && (
                    <>
                      <li>
                        <button className="dropdown-item" style={{ backgroundColor: "#1787e0", color: "#fff" }} onClick={handleAdminClick}>
                          {t("Admin")}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" style={{ backgroundColor: "#1787e0", color: "#fff" }} onClick={handleLogout}>
                          {t("Logout")}
                        </button>
                      </li>
                    </>
                  )}
                  {roleId === "3" && (
                    <>
                      <li>
                        <button className="dropdown-item" style={{ backgroundColor: "#1787e0", color: "#fff" }} onClick={handleAdminDashboardClick}>
                          {t("Admin Dashboard")}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" style={{ backgroundColor: "#1787e0", color: "#fff" }} onClick={handleLogout}>
                          {t("Logout")}
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            ) : (
              <ul className="navbar-nav d-flex align-items-center">
                <li className="nav-item dropdown">
                  <NavLink
                    to="#"
                    className="nav-link dropdown-toggle"
                    id="loginDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={showLoginDropdown}
                    onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  >
                    {t("Login")}
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="loginDropdown" style={{ backgroundColor: "#1787e0", color: "#fff" }}>
                    <li>
                      <NavLink to="login" className="dropdown-item">
                        {t("Login as User")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="loginDoc" className="dropdown-item">
                        {t("Login as Doctor")}
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    to="#"
                    className="nav-link dropdown-toggle"
                    id="registerDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={showRegisterDropdown}
                    onClick={() => setShowRegisterDropdown(!showRegisterDropdown)}
                  >
                    {t("Register")}
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="registerDropdown" style={{ backgroundColor: "#1787e0", color: "#fff" }}>
                    <li>
                      <NavLink to="register" className="dropdown-item">
                        {t("Register as User")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="registerDoc" className="dropdown-item">
                        {t("Register as Doctor")}
                      </NavLink>
                    </li>
                  </ul>
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
                <li key={result.id} onClick={() => navigate(`/clinic/${result.id}`)}>
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

