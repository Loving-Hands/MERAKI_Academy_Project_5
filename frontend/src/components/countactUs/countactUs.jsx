import axios from 'axios';
import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../countactUs/index.css'
function ContactUs() {
    const [contactMessage, setContactMessage] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/contactUs/create", { fullName, phoneNumber, email, comment })
            .then((res) => {
                setContactMessage("Message sent successfully!");
                setFullName("");
                setPhoneNumber("");
                setEmail("");
                setComment("");
            })
            .catch((error) => {
                setContactMessage("Error sending message. Please try again.");
            });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>اتصل بنا</Card.Title>
                            <Card.Text>نحن سعداء لتلقي استفساراتكم واقتراحاتكم.</Card.Text>
                            <Row>
                                <Col>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="fullName">
                                            <Form.Label>الاسم الكامل</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="الرجاء إدخال الاسم الكامل"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="phoneNumber">
                                            <Form.Label>رقم الموبايل</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                placeholder="الرجاء إدخال رقم الموبايل"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="email">
                                            <Form.Label>البريد الإلكتروني</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="example@domain.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="comment">
                                            <Form.Label>التعليقات</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="الرجاء إدخال تعليقاتك"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                                            إرسال
                                        </Button>
                                    </Form>
                                    {contactMessage && <p>{contactMessage}</p>}
                                </Col>
                                <Col md="auto">
                                    <div className="text-center">
                                        <p className='coo'>راسلنا على</p><br/>
                                        <a href="mailto:customercare.jo@vezeeta.com">customercare.jo@vezeeta.com</a>
                                        <div>
                                            <FaFacebook style={{ marginRight: '10px' }} />
                                            <FaInstagram style={{ marginRight: '10px' }} />
                                            <FaTwitter />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactUs;
