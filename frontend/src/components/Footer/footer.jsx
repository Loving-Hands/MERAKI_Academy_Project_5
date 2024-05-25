import React from "react";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./NewLogo3.png";

export default function footer() {
  return (
    <div>
      <footer className="footer mt-auto py-3 bg-primary text-white customFooter">
        <div className="container">
          <div className="row">
            <div className="col-md-3" style={{ lineHeight: "2" }}>
              <img src={logo} alt="logo" style={{ width: "160px" }} />
              <div>
                {" "}
                <Link to="https://www.facebook.com/">
                  <FaFacebook
                    style={{ marginRight: "10px", color: "#ffffff" }}
                  />
                </Link>
                <Link to="https://www.instagram.com/">
                  <FaInstagram
                    style={{ marginRight: "10px", color: "#ffffff" }}
                  />
                </Link>
                <Link
                  to="https://x.com/"
                  style={{ marginRight: "10px", color: "#ffffff" }}
                >
                  <FaTwitter />
                </Link>
              </div>
            </div>
            <div className="col-md-3">
              <h5 className="text-white">About Us</h5>
              <ul className="list-unstyled text-white">
                <li>
                  <a href="#" className="text-white">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3" style={{ lineHeight: "2" }}>
              <h5 className="text-white">Search By</h5>
              <ul className="list-unstyled text-white">
                <li>
                  <a href="#" className="text-white">
                    Speciality
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Area
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Hospital
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Center
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3" style={{ lineHeight: "2" }}>
              <h5 className="text-white">Are You A Doctor ?</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Join Loving Hands Doctors{" "}
                  </a>
                </li>
              </ul>
              <h5 className="text-white">Need Help?</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Medical Library{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Contact Us{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Doctors Privacy Policy
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
