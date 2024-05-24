import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        email,
        password,
      });
      setMessage(response.data.message);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("roleId", response.data.roleId);
        localStorage.setItem("username", response.data.username);
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <>
      <div className="container">
        <h2 className="my-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {message && <div className="mt-3 alert alert-info">{message}</div>}
      </div>
      );
    </>
  );
}
