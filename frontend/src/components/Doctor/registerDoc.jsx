import React, { useState, useEffect } from "react";
import "./RegisterDoc.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const registerDoc = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const [full_name, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [image_doctor, setImageDoctor] = useState("");
  const [specializationDoctor, setSpecializationDoctor] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  // =================================================================
  useEffect(() => {
    axios
      .get("http://localhost:5000/specialization/")
      .then((result) => {
        setSpecializations(result.data);
      })
      .catch((error) => {
        console.error("Error fetching specializations:", error);
      });
  }, []);

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/doctor/register", {
        full_name,
        phone_number,
        email,
        password,
        gender,
        image_doctor,
        specializationDoctor,
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
  const handleFileChange = (e) => {
    setImageDoctor(e.target.files[0]);
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
              <label>Your_Image</label>
              <form>
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  value={image_doctor}
                  onChange={(e) =>handleFileChange(e.target.value)}
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
                {/* {specializations.map(spec => (
                  <option key={spec.id} value={spec.name}>{spec.name}</option>
                ))} */}
              </select>
            </div>
            <div className="inputfield">
              <input type="submit" defaultValue="Register" className="btn" onClick={navigate("/loginDoc")}/>
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

export default registerDoc;
