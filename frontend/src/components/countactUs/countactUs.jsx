import axios from 'axios';
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import '../countactUs/index.css';

function ContactUs() {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [countact, setCountact] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/contactUs/create", { fullName, phoneNumber, email, comment })
            .then((res) => {
                setCountact(res.data)
                setErrorMessage("");
                setSuccessMessage("Message sent successfully!");
                setFullName("");
                setPhoneNumber("");
                setEmail("");
                setComment("");
            })
            .catch((error) => {
                setSuccessMessage("");
                setErrorMessage("Error sending message. Please try again.");
            });
    };

    return (
        <section className="contact-sec sec-pad">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="contact-detail">
                            <h1 className="section-title">Contact us</h1>
                            <ul className="contact-ul">
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form className="contFrm">
                            <div className="row">
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="inptFld"
                                        required=""
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="inptFld"
                                        required=""
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="inptFld"
                                        required=""
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <textarea
                                        className="inptFld"
                                        placeholder="Your Message..."
                                        required=""
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="inptBtn"
                                        onClick={handleSubmit}
                                    >
                                        SUBMIT
                                    </button>
                                </div>
                            </div>
                        </form>
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    </div>
                </div>
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <p>Copyright © All rights reserved | Ajeet</p>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;
