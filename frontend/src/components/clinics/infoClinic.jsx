import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { BsQuestionSquare } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./top-clinic.png";
import { useDispatch, useSelector } from "react-redux";
export default function InfoClinic() {
  const { id } = useParams();
  const [clinicData, setClinicData] = useState({});
  const [rate, setRate] = useState([]); // Corrected initialization
  const [userRate, setUserRate] = useState("");
  const [userComment, setUserComment] = useState("");
  const dispatch = useDispatch();

  const [commentCount, setCommentCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 2;

  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  // console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/clinic/info/${id}`)
      .then((result) => {
        setClinicData(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const handleBookPage = () => {
    navigate(`/appointment/${id}`);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/ratings/info/${id}`)
      .then((result) => {
        console.log("from rating useEffect", result.data.result);
        setRate(result.data.result);
        setCommentCount(result.data.result.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComment = rate.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();

    const ratingData = {
      rating: userRate,
      comment: userComment,
    };

    axios
      .post(`http://localhost:5000/ratings/${id}`, ratingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("from creating comment", result);
        // setRate(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRating = (rate) => {
    setUserRate(rate);
    console.log(rate);
  };

  const addComment = (e) => {
    setUserComment(e.target.value);
    console.log(userComment);
  };

  //======================================================================================

  return (
    <>
      <section className="clinic-specialization">
        <div
          className="all-title-box"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="text-center text-capitalize">
                  {clinicData.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="info_clinic container">
        <div className="row">
          <div className="col-lg-7">
            {clinicData && (
              <>
                <div className="card dark" key={clinicData.id}>
                  <img
                    src={clinicData.doctor_image}
                    className="card-img-top"
                    alt="Clinic"
                  />
                  <div className="card-body">
                    <div className="text-section">
                      <h5 className="card-title">
                        Doctor {clinicData.doctor_name}
                      </h5>
                      <p className="card-text">
                        {clinicData.name_specialization}
                      </p>
                      <p className="text-capitalize">
                        {clinicData.description}
                      </p>
                      <div className="star">
                        <Rating initialValue={clinicData.avg_rating} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card dark doctorInformation">
                  <div className="card-body">
                    <div className="text-section">
                      <BsQuestionSquare size={30} />
                      <span className="text-capitalize p-2">
                        Information about Doctor
                      </span>
                      <p className="p-4 text-capitalize">
                        {clinicData.long_description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card dark imageClinic">
                  <div className="card-body">
                    <div className="text-section">
                      <CiImageOn size={30} />{" "}
                      <span className="text-capitalize p-2">Image Clinic</span>
                      <div className="img-clinic">
                        <img src={clinicData.image_clinic} alt="Clinic" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <h4 className="container-Total-Comments">
              Total Comments: {commentCount}
            </h4>
            <hr />
            {currentComment.map((comment, index) => (
              <div className="comments container">
                <div className="row">
                  <div className="col-lg-12 mb-3" key={index}>
                    <div className="row">
                      <div className="col-lg-9">
                        <div className="star">
                          <Rating initialValue={comment.rating} />
                        </div>
                        {/* <h5>Overall Rating</h5> */}
                        <h6 className="user_comment">
                          {" "}
                          Your Comment :{comment.comment}
                        </h6>
                        <p
                          className="user_name"
                          style={{ marginBottom: "0px" }}
                        >
                          {" "}
                          Your Name :{comment.user_full_name || "Anonymous"}
                        </p>
                        <p className="rating_date">
                          {" "}
                          Rating Date :
                          {new Date(comment.rating_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-lg-3 text-center">
                        <h3
                          style={{
                            display: "block",
                            backgroundColor: "rgb(23, 135, 224)",
                            borderRadius: "5px",
                          }}
                        >
                          {comment.rating}
                        </h3>
                        <p>Doctor Rating</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center mt-4">
                {[
                  ...Array(Math.ceil(commentCount / commentsPerPage)).keys(),
                ].map((number) => (
                  <li key={number + 1} className="page-item">
                    <button
                      onClick={() => paginate(number + 1)}
                      className="page-link"
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="Rating"
              style={{ backgroundColor: "rgb(241, 235, 235)", padding: "25px" }}
            >
              <div className="row">
                <div className="col-lg-12">
                  <form onSubmit={handleSubmitRating}>
                    <h3>Add Your Comment</h3>
                    <Rating onClick={handleRating} />
                    <br />
                    <input
                      className="input-add-comment"
                      type="text"
                      onChange={addComment}
                      style={{
                        borderRadius: "5px",
                        marginLeft: "5px",
                        color: " #000000",
                        border: "none",
                        padding: "5px",
                        marginTop: "10px",
                      }}
                      placeholder="Add Your Comment"
                    />
                    <button
                      style={{
                        borderRadius: "5px",
                        marginLeft: "5px",
                        backgroundColor: "rgb(23, 135, 224)",
                        color: " #fff",
                        border: "none",
                        padding: "5px",
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <br />
          </div>
          <div className="col-lg-5 information_appointment">
            <div className="card">
              <div className="card-head">
                <p className="text-center text-capitalize">
                  Information Appointment
                </p>
              </div>
              <div className="card-body-appintment">
                <p className="text-center">
                  Book <br />A medical
                </p>
                <hr />
                <div className="text-center text-capitalize">
                  <IoLocation />
                  <span>
                    {clinicData.location} <br />{" "}
                    <span className="appointspan">appointment now</span>
                  </span>
                </div>
                <hr />
                <h5 className="text-center text-capitalize">
                  choose Appointment now
                </h5>
                <div className="row edit-width">
                  <div className="col-6">
                    <div className="appointment-box">
                      <h6 className="text-center">Today</h6>
                      <div className="time-info text-center">
                        <strong>From:</strong>
                        {clinicData.time_open}
                        <br />
                        <strong>To:</strong> {clinicData.time_close}
                      </div>
                      <div className="footer">
                        <button
                          className="book-button"
                          onClick={handleBookPage}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="appointment-box">
                      <h6 className="text-center">Tomorrow</h6>
                      <div className="time-info text-center">
                        <strong>From:</strong>
                        {clinicData.time_open}
                        <br />
                        <strong>To:</strong> {clinicData.time_close}
                      </div>
                      <div className="footer">
                        <button
                          className="book-button"
                          onClick={handleBookPage}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="signInNow text-center text-capitalize">
                  <p>sign in for first</p>
                </div>
              </div>
              <div className="card-footer text-capitalize text-center">
                <FaCalendarAlt size={25} />
                appointment online <br /> now and pay in clinic
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}