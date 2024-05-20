import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ChangePassword() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(response => {
        console.log(response.data.user)
        setUserInfo(response.data.user);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
        setLoading(false);
      });
  }, [id]);

  const handleChangePassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/change-password', {
        userId: userInfo.id,
        currentPassword: currentPassword,
        newPassword: newPassword
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred while changing password.');
      console.error('Error changing password:', error);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      {loading ? (
        <p>Loading user information...</p>
      ) : (
        <div>
          <h2>User Details</h2>
          <table>
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{userInfo.id}</td>
              </tr>
              <tr>
                <td>Full Name:</td>
                <td>{userInfo.full_name}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{userInfo.age}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{userInfo.phone_number}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{userInfo.email}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{userInfo.gender}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <label htmlFor="currentPassword">Current Password:</label>
            <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <button onClick={handleChangePassword}>Change Password</button>
          {message && <div>{message}</div>}
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
