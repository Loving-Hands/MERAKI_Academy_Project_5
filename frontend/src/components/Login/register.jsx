import React, { useState, useEffect } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// =================================================================
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const [fullname, setFullName] = useState();
  const [age, setAge] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const [register, setregister] = useState();
  const [role, setRole] = useState("1");
  console.log(fullname, age, phoneNumber, email, password, gender, role);
  // =================================================================

  const addNewUser = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/users/register`, {
        full_name: fullname,
        phone_number: phoneNumber,
        email: email,
        password: password,
        gender: gender,
        age: age,
        role_id: role, // This sends the fixed role ID "1" to the server
      })
      .then((result) => {
        console.log(result);
        setMessage("");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error occurred during registration:");
        if (error.response && error.response.data) {
          return setMessage(error.response.data.message);
        }
        // You might want to update state to show an error message to the user
      });
  };
  // =================================================================

  return (
    <>
      {!isLoggedIn ? (
        <div className="wrapper">
          <div className="title">Sign Up</div>
          <form className="form" onSubmit={addNewUser}>
            <div className="inputfield">
              <label>Full Name</label>
              <input
                type="text"
                className="input"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Phone_Number</label>
              <input
                type="text"
                className="input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Gender</label>
              <>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  defaultValue="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="html">Male</label>
                <br />
                <input
                  type="radio"
                  id="css"
                  name="fav_language"
                  defaultValue="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="css">Female</label>
              </>
            </div>
            <div className="inputfield">
              <label>Age</label>
              <input
                type="number"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="inputfield">
              <button className="btn">Register</button>
            </div>
            <div className="inputfield">
              <button type="button" className="login-with-google-btn">
                Continue with Google
              </button>
            </div>
          </form>
          
        </div>
      ) : (
        <p>Logout First</p>
      )}
      {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default Register;