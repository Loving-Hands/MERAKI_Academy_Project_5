import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "../countactUs/index.css";

import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const countactUs = (e) => {
    e.preventDefault();
    // ---------------- Notify
    const notifySuccess = () =>
      toast.success("Message Send Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    const notifyError = () =>
      toast.error("Falid", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    // ---------------- Notify End
    axios
      .post("http://localhost:5000/contactUs/create", {
        full_name: fullName,
        phone_number: phoneNumber,
        email,
        comment,
      })
      .then((res) => {
        console.log(res.data);
        setSuccessMessage(res.data.message);
        setErrorMessage("");
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setComment("");

        notifySuccess();
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("حدث خطأ أثناء إرسال رسالتك. حاول مرة أخرى.");
        setSuccessMessage("");
        notifyError();
      });
  };

  return (
    <section className="contact-sec sec-pad">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="contact-detail">
              <h1 className="section-title">Contact Us</h1>
              <p>Have questions or feedback? Get in touch with us!</p>
            </div>
          </div>
          <div className="col-md-6">
            <form className="contFrm" onSubmit={countactUs}>
              <div className="row">
                <div className="col-sm-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="inptFld"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="email"
                    placeholder="Email"
                    className="inptFld"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="inptFld"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="inptFld"
                    placeholder="Your Message ..."
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="inptBtn fw-bold">
                    Send
                  </button>
                  <div className="col-12 mt-3">
                    {successMessage && (
                      <Alert variant="success">{successMessage}</Alert>
                    )}
                    {errorMessage && (
                      <Alert variant="danger">{errorMessage}</Alert>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
