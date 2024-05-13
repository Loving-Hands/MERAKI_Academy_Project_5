import React, { useContext, useState } from "react";
import "./Register.css";
import axios from "axios";

// import { AuthContext } from "../../contexts/authContext";

// =================================================================

const Register = () => {
//   const { isLoggedIn } = useContext(AuthContext);

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
        password
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
      <div className="Form">
        {!isLoggedIn ? (
          <>
            <p className="Title">Register:</p>
            <form onSubmit={addNewUser}>
              <br />
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Gender"
                onChange={(e) => setgender(e.target.value)}
              />
              <br />
              <input
                type="number"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Phone_number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <br />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button>Register</button>
              <br />
            </form>
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </>
        ) : (
          <p>Logout First</p>
        )}
      </div>
    </>
  );
};

export default Register;