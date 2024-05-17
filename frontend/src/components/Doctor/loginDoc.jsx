import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginDoc.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setDoctorId,
  setRoleId,
} from "../../service/redux/reducers/doctor/doctorSlice";

//====================================================================

const loginDoc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, doctorId,role } = useSelector((state) => {
    return {
      // token : state.doc.token,
      isLoggedIn: state.doc.isLoggedIn,
      doctorId: state.doc.doctorId,
      role : state.doc.role
    };
  });

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
        console.log("token from doctor login", result.data);
        setMessage("");
        dispatch(setLogin(result.data.token));
        dispatch(setDoctorId(result.data.doctorId));
        dispatch(setRoleId(result.data.role_id));
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
      if(role===2){
        navigate("/");
      }
    }
  }, [isLoggedIn, doctorId, role]);

  //===============================================================
  return (
    <>
      <div className="wrapper">
        <div className="title">Doctor_Login</div>
        <div className="form" onSubmit={Login}>
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
            <button
              className="btn"
              onClick={(e) => {
                Login(e);
              }}
            >
              Login
            </button>
          </div>
          <div className="inputfield">
            <button type="button" className="login-with-google-btn">
              Continue with Google
            </button>
          </div>
        </div>
      </div>
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};
export default loginDoc;
