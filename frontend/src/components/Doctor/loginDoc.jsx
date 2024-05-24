import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginDoc.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setDoctorId,
  setRoleId,
  setUsername
  
  setDocName,
} from "../../service/redux/reducers/doctor/doctorSlice";

//====================================================================

const loginDoc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedInDoc, doctorId, roleDoc } = useSelector((state) => {
    return {
      // token : state.doc.token,
      isLoggedInDoc: state.doc.isLoggedIn,
      doctorId: state.doc.doctorId,
      roleDoc: state.doc.role,

    };
  });

  const { isLoggedInDoc, doctorId, roleDoc, setDocName } = useSelector(
    (state) => {
      return {
        // token : state.doc.token,
        isLoggedInDoc: state.doc.isLoggedIn,
        doctorId: state.doc.doctorId,
        roleDoc: state.doc.role,
        setDocName: state.doc.docName,
      };
    }
  );

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({});

  //===============================================================
  const Login = async (e) => {
    // console.log(isLoggedInDoc);
    e.preventDefault();
    setErrors(Validation({ email, password }));
    try {
      const result = await axios.post("http://localhost:5000/doctor/login", {
        email,
        password,
      });
      if (result.data) {
        //  back
        console.log(result.data.docName);
        setMessage("");
        dispatch(setLogin(result.data.token));
        dispatch(setDoctorId(result.data.doctorId));
        dispatch(setRoleId(result.data.role_id));
        dispatch(setUsername(result.data.username))


        // dispatch(setDocName(result.data.full_name));
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
    if (isLoggedInDoc) {
      if (roleDoc === 2) {
        navigate("/");
      }
    }
  }, [isLoggedInDoc, doctorId, roleDoc]);

  const Validation = (values) => {
    const errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

    if (values.email === "") {
      errors.email = "Email is Required!";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Email did not match the format";
    }
    if (values.password === "") {
      errors.password = "Password is Required!";
    }
    return errors;
  };
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
            {errors.email && (
              <p className="text" style={{ color: "red" }}>
                {errors.email}
              </p>
            )}
          </div>
          <div className="inputfield">
            <label>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="inputfield" style={{ color: "red" }}>
                {errors.password}
              </p>
            )}
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
          {status
            ? console.log("true")
            : message && (
                <p className="invalid-message" style={{ color: "red" }}>
                  {message}
                </p>
              )}
          <div className="inputfield">
            <button type="button" className="login-with-google-btn">
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default loginDoc;
