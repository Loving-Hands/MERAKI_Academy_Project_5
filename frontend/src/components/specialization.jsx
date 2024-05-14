import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SpecializationDetails() {
  const [clinics, setClinics] = useState([]);
  const {id}=useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/clinic/${id}`)
      .then((res) => {
        setClinics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <h1>قائمة الأطباء والعيادات لهذا التخصص</h1>
      {clinics.map((clinic) => (
        <div key={clinic.id}>
          <h2>{clinic.name}</h2>
          <p>الموقع: {clinic.location}</p>
          <img src={clinic.image_clinic} alt={clinic.name} style={{ width: "200px", height: "auto" }} />
          <p>الوصف: {clinic.description}</p>
          <p>أيام العمل: {clinic.open_days.join(", ")}</p>
          <p>وقت الفتح: {clinic.time_open}</p>
          <p>وقت الإغلاق: {clinic.time_close}</p>
        </div>
      ))}
    </div>
  );
}

export default SpecializationDetails;
