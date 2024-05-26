import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { setLogout } from "../../service/redux/reducers/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "./NewLogo3.png";
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

  function reloadPage() {
    // The last "domLoading" Time //

    var currentDocumentTimestamp = new Date(
      performance.timing.domLoading
    ).getTime();

    // Current Time //

    var now = Date.now();

    // Ten Seconds //

    var tenSec = 10 * 1000;

    // Plus Ten Seconds //

    var plusTenSec = currentDocumentTimestamp + tenSec;

    if (now > plusTenSec) {
      location.reload();
    } else {
      ("");
    }
  }

  useEffect(() => {
    switch (roleId) {
      case "1":
        setFullname(username);
        break;
      case "2":
        setFullname(docName);
        reloadPage();
        navigate("/");
        break;
      case "3":
        reloadPage();
        setFullname(username);
        navigate("/");
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

  const handleAdminClick = () => {
    navigate("/createClinic");
  };

  const handleAdminDashboardClick = () => {
    navigate("/adminDashboard");
  };

  const handleGoToAppointment = (id) => {
    if (id === "1") {
      navigate(`appointment/user/${id}`);
    } else {
      const doctorId = localStorage.getItem("doctorId");
      navigate(`appointment/doctor/${doctorId}`);
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#1787e0" }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link to="/" className="navbar-brand">
            <img src={logo} style={{ width: "160px" }} alt="Logo" />
          </Link>

          <form className="d-flex mx-auto">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
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
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <div className="dropdown me-2">
                {roleId == "1" ? (
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
                ) : (
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
                    Dr.{fullname}
                  </button>
                )}
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  style={{ backgroundColor: "#1787e0", color: "#fff" }}
                >
                  {roleId === "1" && (
                    <>
                      <li>
                        <button
                          className="dropdown-item"
                          style={{ backgroundColor: "#1787e0", color: "#fff" }}
                          onClick={() => handleGoToAppointment(roleId)}
                        >
                          My Appointments
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          style={{ backgroundColor: "#1787e0", color: "#fff" }}
                          onClick={() => handleSpecializationClick(userId)}
                        >
                          My Information
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          style={{ backgroundColor: "#1787e0", color: "#fff" }}
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                  {roleId === "2" && (
                    <>
                      <li>
                        <button
                          className="dropdown-item"
                          style={{ backgroundColor: "#1787e0", color: "#fff" }}
                          onClick={() => handleGoToAppointment(roleId)}
                        >
                          Your Clinic Appointment
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          style={{ backgroundColor: "#1787e0", color: "#fff" }}
                          onClick={handleAdminClick}
                        >
                          Create Clinic
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          style={{ backgroundColor: "#1787e0", color: "#fff" }}
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                  {roleId === "3" && (
                    <>
                      <li>
                        <button
                          className="dropdown-item"
                          style={{ backgroundColor: "#1787e0", color: "#fff" }}
                          onClick={handleAdminDashboardClick}
                        >
                          Admin Dashboard
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          style={{ backgroundColor: "#1787e0", color: "#fff" }}
                          onClick={handleLogout}
                        >
                          Logout
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
                    Login
                  </NavLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="loginDropdown"
                    style={{ backgroundColor: "#1787e0" }}
                  >
                    <li>
                      <NavLink
                        to="login"
                        className="dropdown-item"
                        style={{ color: "" }}
                      >
                        Login as User
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="loginDoc" className="dropdown-item">
                        Login as Doctor
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
                    onClick={() =>
                      setShowRegisterDropdown(!showRegisterDropdown)
                    }
                  >
                    Register
                  </NavLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="registerDropdown"
                    style={{ backgroundColor: "#1787e0", color: "#fff" }}
                  >
                    <li>
                      <NavLink to="register" className="dropdown-item">
                        Register as User
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="registerDoc" className="dropdown-item">
                        Register as Doctor
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <NavLink to="/contactus" className="nav-link">
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/aboutUs" className="nav-link">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/allClinics" className="nav-link">
                  Clinics
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
