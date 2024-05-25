import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import ScrollToTop from "react-scroll-to-top";

function UserInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        console.log(response.data.user);
        setUserInfo(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/change-password",
        {
          userId: userInfo.id,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred while changing password.");
      console.error("Error changing password:", error);
    }
  };

  return (
    <>
      <main>
        <div className="unique-form-container edit_information">
          <h1 className="unique-title">
            <span>User Information</span>
          </h1>
          {loading ? (
            <p>Loading user information...</p>
          ) : (
            <>
              <form autoComplete="off">
                <label htmlFor="employeeid">Employee ID</label>
                <input
                  type="text"
                  placeholder="ID"
                  id="employeeid"
                  value={userInfo.id}
                  readOnly
                />

                <label htmlFor="name">Name</label>
                <div className="unique-row">
                  <input
                    type="text"
                    placeholder="Firstname"
                    id="firstname"
                    value={userInfo.full_name}
                    readOnly
                  />
                </div>

                <label htmlFor="dateofbirth">Age</label>
                <input
                  type="text"
                  id="dateofbirth"
                  value={userInfo.age}
                  placeholder="Age"
                  readOnly
                />

                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={userInfo.email}
                  readOnly
                  placeholder="Email"
                />

                <label htmlFor="phone_number">Phone Number</label>
                <input
                  type="text"
                  id="phone_number"
                  value={userInfo.phone_number}
                  readOnly
                  placeholder="Phone Number"
                />

                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  value={userInfo.gender}
                  placeholder="Gender"
                  readOnly
                />
              </form>

              <form onSubmit={handleChangePassword}>
                <h2>Change Password</h2>
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="Current Password"
                />

                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="New Password"
                />

                <button type="submit">Change Password</button>
              </form>
              {message && <p>{message}</p>}
            </>
          )}
        </div>
      </main>
      <ScrollToTop smooth />
    </>
  );
}

export default UserInfo;
