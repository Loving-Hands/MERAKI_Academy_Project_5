import React, { useState, useEffect } from "react";
import "./RegisterDoc.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
//=================================================================
const registerDoc = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => {
  //   return {
  //     isLoggedIn: state.doc.isLoggedIn,
  //   };
  // });

  const [fullname, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [imageDoctor, setImageDoctor] = useState("");
  const [specializationDoctor, setSpecializationDoctor] = useState();
  const [specializations, setSpecializations] = useState([]);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState("2");
  const [errors, setErrors] = useState({});

  console.log(
    fullname,
    phoneNumber,
    email,
    password,
    gender,
    role,
    imageDoctor,
    specializationDoctor
  );

  // =================================================================

  useEffect(() => {
    axios
      .get("http://localhost:5000/specialization/")
      .then((result) => {
        setSpecializations(result.data.result);
      })
      .catch((error) => {
        console.error("Error fetching specializations:", error);
      });
  }, []);

  const addNewUser = (e) => {
    e.preventDefault();
    setErrors(
      Validation({
        fullname,
        phoneNumber,
        email,
        password,
        gender,
        imageDoctor,
        specializationDoctor,
      })
    );

    axios
      .post("http://localhost:5000/doctor/register", {
        full_name: fullname,
        phone_number: phoneNumber,
        password: password,
        email: email,
        gender: gender,
        role_id: 2,
        image_doctor: imageDoctor,
        specialization_doctor: specializationDoctor,
      })
      .then((result) => {
        console.log(result);
        navigate("/loginDoc");
      })
      .catch((error) => {
        console.log("Error occurred during registration:");
        if (error.response && error.response.data) {
          return setMessage(error.response.data.message);
        }
        // You might want to update state to show an error message to the user
      });
  };
  const uploadImage = (files) => {
    const formData = new FormData();

    formData.append("file", files[0]);
    formData.append("upload_preset", "LovingHands");
    fetch("https://api.cloudinary.com/v1_1/dnldkv1cd/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json(console.log(response)))
      .then((data) => {
        setImageDoctor(data.secure_url);
      });
  };

  const Validation = (values) => {
    const errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const phone_pattern = /^\d{10}$/;

    if (!values.fullname) {
      errors.fullname = "Full Name is Required!";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "phone Number is Required!";
    } else if (!phone_pattern.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be 10 digits";
    }
    if (!values.email) {
      errors.email = "Email is Required!";
    }
    // else if (!email_pattern.test(values.email)) {
    //   errors.email = "Email did not match";
    // }
    if (!values.password) {
      errors.password = "Password is Required!";
    }
    if (!values.gender) {
      errors.gender = "Gender is Required!";
    }
    if (!values.imageDoctor) {
      errors.imageDoctor = "Your Image is Required";
    }
    if (!values.specializationDoctor) {
      errors.specializationDoctor = "your specialization is Required";
    }
    return errors;
  };
  // =================================================================

  return (
    <>
      <div className="wrapper_reg_doctor">
        <div className="title">Sign Up</div>
        <div className="form">
          <div className="inputfield">
            <label>Full Name</label>
            <input
              type="text"
              className="input"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            {errors.fullname && (
              <p className="text" style={{ color: "red" }}>
                {errors.fullname}
              </p>
            )}
          </div>
          <div className="inputfield">
            <label>Phone Number</label>
            <input
              type="text"
              className="input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={10}
              required
            />
            {errors.phoneNumber && (
              <p className="text" style={{ color: "red" }}>
                {errors.phoneNumber}
              </p>
            )}
          </div>
          <div className="inputfield">
            <label>Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
            {errors.password && (
              <p className="text" style={{ color: "red" }}>
                {errors.password}
              </p>
            )}
          </div>
          <div className="inputfield">
            <label>Gender</label>
            <>
              <div style={{ padding: "10px" }}>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  defaultValue="Male"
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </div>
              <label htmlFor="html">Male</label>
              <br />
              <div style={{ padding: "10px" }}>
                <input
                  type="radio"
                  id="css"
                  name="fav_language"
                  defaultValue="Female"
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </div>
              <label htmlFor="css">Female</label>
            </>
          </div>
          {errors.gender && (
            <p className="text" style={{ color: "red" }}>
              {errors.gender}
            </p>
          )}
          <div className="inputfield">
            <label>URL IMAGE</label>
            <form>
              <input
                type="file"
                id="myFile"
                name="filename"
                onChange={(e) => uploadImage(e.target.files)}
                required
              />
            </form>
            {errors.imageDoctor && (
              <p className="text" style={{ color: "red" }}>
                {errors.imageDoctor}
              </p>
            )}
          </div>
          <div className="inputfield">
            <label>Your Specialization</label>
            <select
              id="specialization"
              className="input"
              value={specializationDoctor}
              onChange={(e) => setSpecializationDoctor(e.target.value)}
              required
            >
              {specializations.map((specialization) => (
                <option key={specialization.id} value={specialization.id}>
                  {specialization.name_specialization}
                </option>
              ))}
            </select>
          </div>
          {errors.specializationDoctor && (
            <p className="text" style={{ color: "red" }}>
              {errors.specializationDoctor}
            </p>
          )}
          <div className="inputfield">
            <input
              type="submit"
              defaultValue="Register"
              className="btn"
              onClick={addNewUser}
            />
          </div>
          {status
            ? console.log("true")
            : message && (
                <p className="invalid-message-reg" style={{ color: "red" }}>
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

export default registerDoc;
