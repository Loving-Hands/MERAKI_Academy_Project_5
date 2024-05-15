import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginDoc.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {setLogin,setDoctorId} from "../../service/redux/reducers/doctor/doctorSlice";

//====================================================================

const loginDoc = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => {
    return {
      // token : state.doc.token,
      isLoggedIn: state.auth.isLoggedIn,
      // doctorId : state.doc.doctorId
    };
  });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================
  const Login = async (e) => {
    console.log(isLoggedIn);
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/doctor/login", {
        email,
        password,
      });
      if (result.data) {
        console.log(result.data);
        setMessage("");
        dispatch(setLogin(result.data.token));
        dispatch(setDoctorId(result.data.doctorId));
      } else throw Error;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  //===============================================================
  return (
    <>
      {!isLoggedIn ? (
        <div className="wrapper">
          <div className="title">Sign In</div>
          <div className="form">
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
              <input
                type="submit"
                defaultValue="Register"
                className="btn"
                onClick={navigate("/")}
              />
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
export default loginDoc;