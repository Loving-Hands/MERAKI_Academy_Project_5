import React, { useState,useEffect } from "react";
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

  const [full_name, setFullName] = useState("");
  const [age, setAge] = useState(0);
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  // =================================================================

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/register", {
        full_name,
        age,
        phone_number,
        email,
        password,
        gender,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage(result.data.message);
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };
  // =================================================================

  return (
    <>
      {!isLoggedIn ? (
        <div className="wrapper">
          <div className="title">Sign Up</div>
          <div className="form" onSubmit={addNewUser}>
            <div className="inputfield">
              <label>Full Name</label>
              <input
                type="text"
                className="input"
                value={full_name}
                onChange={(e) =>setFullName(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Phone_Number</label>
              <input
                type="text"
                className="input"
                value={phone_number}
                onChange={(e) =>setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Gender</label>
              <input
                type="text"
                className="input"
                value={gender}
                onChange={(e) =>setGender(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Age</label>
              <input
                type="number"
                className="input"
                value={age}
                onChange={(e) =>setAge(e.target.value)}
              />
            </div>
            <div className="inputfield">
              <input type="submit" defaultValue="Register" className="btn"/>
            </div>
            <div className="inputfield">
              <button type="button" className="login-with-google-btn">
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Register;
