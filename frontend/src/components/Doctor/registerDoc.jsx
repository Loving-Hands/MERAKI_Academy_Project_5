import React, { useState, useEffect } from "react";
import "./RegisterDoc.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const registerDoc = () => {
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

  useEffect(() => {
    axios.get("http://localhost:5000/specialization/")
      .then(result => {
        setSpecializations(result.data);
      })
      .catch(error => {
        console.error("Error fetching specializations:", error);
      });
  }, []);
  // =================================================================

  return (
    <>
      {!isLoggedIn ? (
        <div className="wrapper">
          <div className="title">Sign Up</div>
          <div className="form">
            <div className="inputfield">
              <label>Full Name</label>
              <input type="text" className="input" />
            </div>
            <div className="inputfield">
              <label>Phone_Number</label>
              <input type="number" className="input" />
            </div>
            <div className="inputfield">
              <label>Email</label>
              <input type="email" className="input" />
            </div>
            <div className="inputfield">
              <label>Password</label>
              <input type="password" className="input" />
            </div>
            <div className="inputfield">
              <label>Gender</label>
              <input type="text" className="input" />
            </div>
            <div className="inputfield">
              <label>Your_Image</label>
              <form>
                <input type="file" id="myFile" name="filename" onChange={handleFileChange} />
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
              <input type="submit" defaultValue="Register" className="btn" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default registerDoc;
