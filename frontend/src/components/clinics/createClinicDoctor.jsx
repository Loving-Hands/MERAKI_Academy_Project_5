import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

export default function CreateClinicDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image_clinic: "",
    description: "",
    long_description: "",
    time_open: "",
    time_close: "",
    specialization: "",
    open_days: [],
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDaysChange = (e) => {
    const { value } = e.target;
    const isChecked = e.target.checked;
    if (isChecked) {
      setFormData({ ...formData, open_days: [...formData.open_days, value] });
    } else {
      setFormData({
        ...formData,
        open_days: formData.open_days.filter((day) => day !== value),
      });
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "project_5");
    data.append("cloud_name", "dobvkevkw");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dobvkevkw/image/upload",
        data
      );
      console.log(data);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctorId, token } = useSelector((state) => ({
    token: state.doc.token,
    doctorId: state.doc.doctorId,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile) {
      const imageUrl = await uploadImage(imageFile);
      if (imageUrl) {
        formData.image_clinic = imageUrl;
      } else {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/clinic/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Created Success");
      navigate("/");
    } catch (error) {
      console.error("Error creating clinic:", error);
    }
  };

  const [specializationApi, setSpecializationApi] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/specialization/")
      .then((result) => {
        setSpecializationApi(result.data.result);
      })
      .catch((error) => {
        console.error("Error fetching specializations:", error);
      });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="form-group">
          <label>Name Clinic:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image_clinic"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Long Description:</label>
          <textarea
            name="long_description"
            className="form-control"
            value={formData.long_description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Time Open:</label>
          <input
            type="time"
            name="time_open"
            className="form-control"
            value={formData.time_open}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Time Close:</label>
          <input
            type="time"
            name="time_close"
            className="form-control"
            value={formData.time_close}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Specialization:</label>
          <select
            name="specialization"
            className="form-control"
            value={formData.specialization}
            onChange={handleChange}
          >
            <option value="">Select Specialization</option>
            {specializationApi.map((specialization) => (
              <option key={specialization.id} value={specialization.id}>
                {specialization.name_specialization}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group d-flex">
          <label>Open Days:</label>
          <div className="form-check">
            <input
              type="checkbox"
              name="open_days"
              value="Sunday"
              className="form-check-input"
              checked={formData.open_days.includes("Sunday")}
              onChange={handleDaysChange}
            />
            <label className="form-check-label">Sunday</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="open_days"
              value="Monday"
              className="form-check-input"
              checked={formData.open_days.includes("Monday")}
              onChange={handleDaysChange}
            />
            <label className="form-check-label">Monday</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="open_days"
              value="Tuesday"
              className="form-check-input"
              checked={formData.open_days.includes("Tuesday")}
              onChange={handleDaysChange}
            />
            <label className="form-check-label">Tuesday</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="open_days"
              value="Wednesday"
              className="form-check-input"
              checked={formData.open_days.includes("Wednesday")}
              onChange={handleDaysChange}
            />
            <label className="form-check-label">Wednesday</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="open_days"
              value="Thursday"
              className="form-check-input"
              checked={formData.open_days.includes("Thursday")}
              onChange={handleDaysChange}
            />
            <label className="form-check-label">Thursday</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 m-3">
          Submit
        </button>
      </form>
      <ScrollToTop smooth />
    </>
  );
}
