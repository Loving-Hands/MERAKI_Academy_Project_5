import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setUserId,
  setRoleId,
} from "../../service/redux/reducers/auth/authSlice";
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import Sptlization from "../Sptilization/index.jsx";
//====================================================================

const login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, userId, role } = useSelector((state) => {
    return {
      // token : state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
      role: state.auth.role,
    };
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [value, setValue] = useState("");
  //===============================================================
  const Login = async (e) => {
    // console.log(isLoggedIn);
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
        console.log(result.data);
        setMessage("");
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
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
      if (role === 1) {
        navigate("/");
      }
    }
  }, [isLoggedIn, userId, role]);

  const handleWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        console.log(data);
        const result = await axios.post("http://localhost:5000/users/login", {
          email: data.user.email,
          password: data.user.uid,
        });
        setValue(data.user.email);
        console.log(result);
        localStorage.setItem("email", data.user.email);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  //===============================================================
  return (
    <>
      <div className="wrapper">
        <div className="title">User_Login</div>
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
          {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="alert"> {message}</div>}
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
            <button
              type="button"
              className="login-with-google-btn"
              onClick={handleWithGoogle}
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default login;

{
  /* <div class="Commonstyle__Error-sc-1vgucvm-0 jjNxQN">Email Address is invalid</div> */
}
