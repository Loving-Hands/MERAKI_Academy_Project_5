import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function registerAppointmentClinic() {
  const { id } = useParams();
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  const test = {
    date_time: "2024-05-22T10:00:00",
    status: "Pending",
  };
  useEffect(() => {
    axios
      .post(`http://localhost:5000/appointment/${id}/`, test, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {});
  });
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <form>
              <div className="form-group">
                <input
                  type="datetime-local"
                  className="form-control"
                  min="2024-06-07T00:00"
                  max="2025-06-14T00:00"
                  
                />
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h1>asdasd</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
