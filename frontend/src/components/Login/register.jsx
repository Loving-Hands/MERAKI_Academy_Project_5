import React, { useState } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";

// =================================================================

const Register = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const [full_name, setFullName] = useState("");
  const [age, setAge] = useState(0);
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setgender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        gender,
        email,
        password,
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
          <div class="MainContainerstyle__Container-sc-jzlwim-1 knppsE">
            <div class="LimitWidthstyle__LimitWidthStyle-sc-heoo9k-0 bvCdCw">
              <div class="Commonstyle__FormContainer-sc-1vgucvm-4 Commonstyle__CenteredFormContainer-sc-1vgucvm-5 euyaqY jGqWLg">
                <div class="Commonstyle__FormTitle-sc-1vgucvm-6 kMaTNa">
                  Sign Up
                </div>
                <div class="OrDividerstyle__DividerWrapper-sc-bewh18-0 hIpefi"></div>
                <div class="Commonstyle__FormBody-sc-1vgucvm-7 dGDvmy">
                  <form id="signup__form" method="POST" autocomplete="nope">
                    <fieldset class="Commonstyle__StylessFieldSet-sc-1vgucvm-13 gWyIEP">
                      <div class="Commonstyle__InputContainer-sc-1vgucvm-1 gcymtg">
                        <label
                          id="formik-input__label--fullName"
                          for="formik-input__input--fullName"
                          data-testid="formik-input__label"
                          class="Commonstyle__Label-sc-1vgucvm-2 bfFgOv"
                        >
                          Your Name
                          <sup
                            data-testid="formik-input__required-asterisk"
                            class="Commonstyle__RedStar-sc-1vgucvm-3 dHsDLj"
                          >
                            *
                          </sup>
                        </label>
                        <div
                          id="formik-input__input-wrapper--fullName"
                          class="FormikInputstyle__InputWrapper-sc-1sbuvhq-0 hhRUNF"
                        >
                          <input
                            type="text"
                            value=""
                            name="fullName"
                            id="formik-input__input--fullName"
                            data-testid="formik-input__input--fullName"
                            accept=""
                            placeholder="First name and Last name"
                            autocomplete="nope"
                            class="FormikInputstyle__InputField-sc-1sbuvhq-1 btSUkZ"
                          />
                        </div>
                      </div>
                      <div class="Commonstyle__InputContainer-sc-1vgucvm-1 gcymtg">
                        <label
                          id="telephone-input__label"
                          class="Commonstyle__Label-sc-1vgucvm-2 bfFgOv"
                        >
                          Mobile Number
                          <sup
                            data-testid="telephone-input__required-asterisk"
                            class="Commonstyle__RedStar-sc-1vgucvm-3 dHsDLj"
                          >
                            *
                          </sup>
                        </label>
                        <div class="IntlTelInputStylestyle__IntlTellInputWrapper-sc-1orsn1f-0 iXpWfv"></div>
                      </div>
                      <div class="Commonstyle__InputContainer-sc-1vgucvm-1 gcymtg">
                        <label
                          id="formik-input__label--email"
                          for="formik-input__input--email"
                          data-testid="formik-input__label"
                          class="Commonstyle__Label-sc-1vgucvm-2 bfFgOv"
                        >
                          Email Address
                          <sup
                            data-testid="formik-input__required-asterisk"
                            class="Commonstyle__RedStar-sc-1vgucvm-3 dHsDLj"
                          >
                            *
                          </sup>
                        </label>
                        <div
                          id="formik-input__input-wrapper--email"
                          class="FormikInputstyle__InputWrapper-sc-1sbuvhq-0 hhRUNF"
                        >
                          <input
                            type="text"
                            value=""
                            name="email"
                            id="formik-input__input--email"
                            data-testid="formik-input__input--email"
                            accept=""
                            placeholder="example@domain.com"
                            autocomplete="nope"
                            class="FormikInputstyle__InputField-sc-1sbuvhq-1 btSUkZ"
                          />
                        </div>
                      </div>
                      <div class="Commonstyle__InputContainer-sc-1vgucvm-1 gcymtg">
                        <label
                          id="radio-input__label"
                          class="Commonstyle__Label-sc-1vgucvm-2 bfFgOv"
                        >
                          Gender
                          <sup class="Commonstyle__RedStar-sc-1vgucvm-3 dHsDLj">
                            *
                          </sup>
                        </label>
                        <div
                          id="radio-input__input-wrapper"
                          class="RadioInputstyle__InputWrapper-sc-1p78yw8-0 gHKMvo"
                        >
                          <div class="RadioButtonsGroupstyle__RadioButtonGroupContainer-sc-x0i629-0 dTnZbM">
                            <div class="RadioButtonstyle__RadioButtonConatiner-sc-6zm6tw-0 jYAEzh">
                              <input
                                type="radio"
                                id="formik-form__radio-button--female--input"
                                readonly=""
                                aria-label="radio button for Female"
                                class="RadioButtonstyle__RadioButtonInput-sc-6zm6tw-1 fGspaX"
                              />
                              <label
                                for="formik-form__radio-button--female--input"
                                class="RadioButtonstyle__HiddenLabel-sc-6zm6tw-5 euFvTt"
                              >
                                Female
                              </label>
                              <span
                                id="formik-form__radio-button--female--selector"
                                class="RadioButtonstyle__Selector-sc-6zm6tw-2 bKTuZe"
                              ></span>
                              <span
                                for="formik-form__radio-button--female--input"
                                id="formik-form__radio-button--female--label"
                                class="RadioButtonstyle__RadioButtonLabel-sc-6zm6tw-3 bhUxiy"
                              >
                                Female
                              </span>
                            </div>
                            <div class="RadioButtonstyle__RadioButtonConatiner-sc-6zm6tw-0 jYAEzh">
                              <input
                                type="radio"
                                id="formik-form__radio-button--male--input"
                                readonly=""
                                aria-label="radio button for Male"
                                class="RadioButtonstyle__RadioButtonInput-sc-6zm6tw-1 fGspaX"
                              />
                              <label
                                for="formik-form__radio-button--male--input"
                                class="RadioButtonstyle__HiddenLabel-sc-6zm6tw-5 euFvTt"
                              >
                                Male
                              </label>
                              <span
                                id="formik-form__radio-button--male--selector"
                                class="RadioButtonstyle__Selector-sc-6zm6tw-2 bKTuZe"
                              ></span>
                              <span
                                for="formik-form__radio-button--male--input"
                                id="formik-form__radio-button--male--label"
                                class="RadioButtonstyle__RadioButtonLabel-sc-6zm6tw-3 bhUxiy"
                              >
                                Male
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="Commonstyle__InputContainer-sc-1vgucvm-1 gcymtg">
                        <label
                          id="date-input__label"
                          data-testid="date-input__label"
                          class="Commonstyle__Label-sc-1vgucvm-2 bfFgOv"
                        >
                          Birth Date
                        </label>
                        <div
                          id="date-input__input-wrapper"
                          class="FormikInputstyle__InputWrapper-sc-1sbuvhq-0 hhRUNF"
                        >
                          <input
                            type="text"
                            value=""
                            name="birthDate"
                            id="date-input__input"
                            readonly=""
                            class="FormikInputstyle__InputField-sc-1sbuvhq-1 btSUkZ"
                          />
                        </div>
                      </div>
                      <div class="Commonstyle__InputContainer-sc-1vgucvm-1 ijOsQf">
                        <label
                          id="formik-input__label--password"
                          for="formik-input__input--password"
                          data-testid="formik-input__label"
                          class="Commonstyle__Label-sc-1vgucvm-2 bfFgOv"
                        >
                          Password
                          <sup
                            data-testid="formik-input__required-asterisk"
                            class="Commonstyle__RedStar-sc-1vgucvm-3 dHsDLj"
                          >
                            *
                          </sup>
                        </label>
                        <div
                          id="formik-input__input-wrapper--password"
                          class="FormikInputstyle__InputWrapper-sc-1sbuvhq-0 hhRUNF"
                        >
                          <input
                            type="password"
                            value=""
                            name="password"
                            id="formik-input__input--password"
                            data-testid="formik-input__input--password"
                            accept=""
                            placeholder=""
                            autocomplete="new-password"
                            class="FormikInputstyle__InputField-sc-1sbuvhq-1 btSUkZ"
                          />
                        </div>
                      </div>
                      <button
                        id="Generated_Button_ID_359"
                        aria-label=""
                        title=""
                        width=""
                        class="Buttonstyle__ButtonStyle-sc-19jncun-0 fNENyd"
                      >
                        JOIN NOW
                      </button>
                    </fieldset>
                  </form>
                </div>
                <div class="Commonstyle__GreyText-sc-1vgucvm-9 fpovVe">
                  Already Registered in Vezeeta ?
                  <a
                    href="/en/Account/SignIn"
                    class="Commonstyle__AWithRedLine-sc-1vgucvm-10 fpGHyl"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
           ):null}
        </>
  );
};

export default Register;

// {
//    <div className="Form">
//         {!isLoggedIn ? (
//           <>
//             <p className="Title">Register</p>
//             <form onSubmit={addNewUser}>
//               <br />
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 onChange={(e) => setFullName(e.target.value)}
//               />
//               <br />
//               <input
//                 type="text"
//                 placeholder="Gender"
//                 onChange={(e) => setgender(e.target.value)}
//               />
//               <br />
//               <input
//                 type="number"
//                 placeholder="Age"
//                 onChange={(e) => setAge(e.target.value)}
//               />
//               <br />
//               <input
//                 type="text"
//                 placeholder="Phone_number"
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//               <br />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <br />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <br />
//               <button>Register</button>
//               <br />
//             </form>
//             {status
//               ? message && <div className="SuccessMessage">{message}</div>
//               : message && <div className="ErrorMessage">{message}</div>}
//           </>
//         ) : (
//           <p>Logout First</p>
//         )}
//       </div>
// }

// <hr class="Signupstyle__Divider-sc-3rlplb-2 jtOvKs"></hr>
