import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {setLogin,setUserId} from "../../service/redux/reducers/auth/authSlice";

//====================================================================

const login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => {
    return {
      // token : state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      // userId : state.auth.userId
    };
  });
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================
  const Login = async (e) => {
    console.log(isLoggedIn);
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
      history("/");
    }
  });

  //===============================================================
  return (
    <>
      <div className="MainContainerstyle__Container-sc-jzlwim-1 knppsE">
        <div className="LimitWidthstyle__LimitWidthStyle-sc-heoo9k-0 bvCdCw">
          <div className="Commonstyle__FormContainer-sc-1vgucvm-4 Commonstyle__CenteredFormContainer-sc-1vgucvm-5 eEOPUm jwvhWC">
            <div className="Commonstyle__FormTitle-sc-1vgucvm-6 kMaTNa">
              Login
            </div>
            <form onSubmit={Login}>
              <div className="Commonstyle__FormBody-sc-1vgucvm-7 kAgJaB">
                <form id="login__from-details__form" method="POST">
                  <fieldset className="Commonstyle__StylessFieldSet-sc-1vgucvm-13 gWyIEP">
                    <div className="Commonstyle__InputContainer-sc-1vgucvm-1 dBwnGl">
                      <label
                        htmlFor="formik-input__input--email"
                        className="Commonstyle__Label-sc-1vgucvm-2 lcQnNi"
                      >
                        Email
                      </label>
                      <div
                        id="formik-input__input-wrapper--email"
                        className="FormikInputstyle__InputWrapper-sc-1sbuvhq-0 jfCYre"
                      >
                        <input
                          type="email"
                          value={email}
                          name="email"
                          id="formik-input__input--email"
                          className="FormikInputstyle__InputField-sc-1sbuvhq-1 btSUkZ"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="Commonstyle__InputContainer-sc-1vgucvm-1 dBwnGl">
                      <label
                        htmlFor="formik-input__input--password"
                        className="Commonstyle__Label-sc-1vgucvm-2 lcQnNi"
                      >
                        Password
                      </label>
                      <div
                        id="formik-input__input-wrapper--password"
                        className="FormikInputstyle__InputWrapper-sc-1sbuvhq-0 jfCYre"
                      >
                        <input
                          type="password"
                          value={password}
                          name="password"
                          id="formik-input__input--password"
                          className="FormikInputstyle__InputField-sc-1sbuvhq-1 btSUkZ"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      id="Generated_Button_ID_626"
                      className="Buttonstyle__ButtonStyle-sc-19jncun-0 jRJzEY"
                      onClick={(e) => {
                        Login(e);
                      }}
                    >
                      LOGIN
                    </button>
                    <div className="Checkboxstyle__CheckboxConatiner-sc-11in8w0-0 iLRdcT">
                      <input
                        type="checkbox"
                        readOnly
                        id="login-page__remeber-me-checkbox--input"
                        className="Checkboxstyle__CheckboxInput-sc-11in8w0-1 duwaTj"
                      />
                      <span
                        id="login-page__remeber-me-checkbox--checkmark"
                        className="Checkboxstyle__Checkmark-sc-11in8w0-3 eKBzFx"
                      ></span>
                      <span
                        htmlFor="login-page__remeber-me-checkbox--input"
                        id="login-page__remeber-me-checkbox--label"
                        className="Checkboxstyle__CheckboxLabel-sc-11in8w0-2 jTQRVl"
                      >
                        Remember Me
                      </span>
                    </div>
                    <a
                      href="/en/Account/ForgotPassword"
                      className="Commonstyle__BlueA-sc-1vgucvm-11 ilzLzt"
                    >
                      Forgot Your Password?
                    </a>
                  </fieldset>
                </form>
              </div>
              <div className="OrDividerstyle__DividerWrapper-sc-bewh18-0 hIpefi">
                <hr className="OrDividerstyle__Divider-sc-bewh18-1 bkscsW" />
              </div>
              <div className="Commonstyle__GreyText-sc-1vgucvm-9 fpovVe">
                New User ?
                <a
                  className="Commonstyle__AWithRedLine-sc-1vgucvm-10 fpGHyl"
                  onClick={()=>{
                    history("/register")
                  }}
                >
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};
export default login;
