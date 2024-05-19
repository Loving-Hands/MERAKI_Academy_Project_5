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
  const [imageDoctor, setImageDoctor] = useState("https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*");
  const [specializationDoctor, setSpecializationDoctor] = useState();
  const [specializations, setSpecializations] = useState([]);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState("2");
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

  const addNewUser = () => {
    // e.preventDefault();
    axios
      .post("http://localhost:5000/doctor/register", {
        full_name: fullname,
        phone_number: phoneNumber,
        password: password,
        email: email,
        gender: gender,
        role_id:2,
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
  // const handleFileChange = () => {
  //   setImageDoctor("https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*");
  // };

  // =================================================================

  return (
    <>
        <div className="wrapper">
          <div className="title">Sign Up</div>
          <div className="form" >
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
              <label>Your_Image</label>
              <form>
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  // value={imageDoctor}
                  // onChange={ ()=>{setImageDoctor("https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*")}}
                />
              </form>
            </div>
            <div className="inputfield">
              <label>Your Specialization</label>
              <select
                id="specialization"
                className="input"
                value={specializationDoctor}
                onChange={(e) => setSpecializationDoctor(e.target.value)}
              >
                {specializations.map((specialization) => (
                  <option
                    key={specialization.id}
                    value={specialization.id}
                  >
                    {specialization.name_specialization}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputfield">
              <input type="submit" defaultValue="Register" className="btn" 
              onClick={addNewUser}/>
            </div>
            <div className="inputfield">
              <button type="button" className="login-with-google-btn">
                Continue with Google
              </button>
            </div>
          </div>
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && (
                <div class="alert">
                  <strong>ATTENTION!</strong> {message}
                </div>
              )}
        </div>
        
    </>
  );
};

export default registerDoc;
