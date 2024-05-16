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

    const countactUs = (e) => {
        e.preventDefault(); // منع السلوك الافتراضي للنموذج من إعادة تحميل الصفحة.
        
        axios.post('http://localhost:5000/contactUs/create', { 
            full_name: fullName, 
            phone_number: phoneNumber, 
            email, 
            comment 
        })
            .then((res) => {
                console.log(res.data);
                setSuccessMessage(res.data.message);
                setErrorMessage("");
                setFullName("");
                setPhoneNumber("");
                setEmail("");
                setComment("");
            })
            .catch((err) => {
                console.error(err);
                setErrorMessage("حدث خطأ أثناء إرسال رسالتك. حاول مرة أخرى.");
                setSuccessMessage(""); 
            });
    };

    return (
        <section className="contact-sec sec-pad">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="contact-detail">
                            <h1 className="section-title">اتصل بنا</h1>
                            <ul className="contact-ul">
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form className="contFrm" onSubmit={countactUs}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        placeholder="اسمك"
                                        className="inptFld"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="email"
                                        placeholder="عنوان البريد الإلكتروني"
                                        className="inptFld"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="tel"
                                        placeholder="رقم الهاتف"
                                        className="inptFld"
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <textarea
                                        className="inptFld"
                                        placeholder="رسالتك..."
                                        required
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="inptBtn"
                                    >
                                        إرسال
                                    </button>
                                    <div className="col-12 mt-3">
                                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
