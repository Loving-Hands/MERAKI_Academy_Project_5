import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";
import ScrollToTop from "react-scroll-to-top";

//=======================================================================
export default function admin() {
  const [clinics, setClinics] = useState([]);
  const [users, setUsers] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [nameSpecialization, setNameSpecialization] = useState("");
  const [imageSpecialization, setImageSpecialization] = useState("");
  const [updateSpecializationId, setUpdateSpecializationId] = useState(null);
  // const role_id = localStorage.getItem("roleId");
  // console.log(role_id);

  //==========================START FETCH DATA================================================
  const clinicData = () => {
    axios
      .get(`http://localhost:5000/clinic/`)
      .then((response) => {
        setClinics(response.data);
      })
      .catch((error) => {
        console.log("Error fetching clinics:", error);
      });
  };
  const userData = () => {
    axios
      .get(`http://localhost:5000/admin/`)
      .then((response) => {
        setUsers(response.data.result);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  };

  const specializationData = () => {
    axios
      .get(`http://localhost:5000/specialization/`)
      .then((response) => {
        setSpecialization(response.data.result);
      })
      .catch((error) => {
        console.log("Error fetching specialization:", error);
      });
  };
  useEffect(() => {
    // Fetch clinics
    clinicData();
    // Fetch users
    userData();
    // Fetch specialization
    specializationData();
  }, []);
  //===========================END FETCH DATA================================================

  //===========================START DELETE DATA=============================================
  const handleDeleteClinic = (id) => {
    axios
      .delete(`http://localhost:5000/admin/removeclinic/${id}`)
      .then((result) => {
        console.log(result.data);
        const newClinics = clinics.filter((clinic) => clinic.id !== id);
        setClinics(newClinics);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/admin/removeuser/${id}`)
      .then((result) => {
        console.log(result.data);
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteSpecialization = (id) => {
    axios
      .delete(`http://localhost:5000/admin/removespecialization/${id}`)
      .then((result) => {
        console.log(result.data);
        const newSpecialization = specialization.filter(
          (singleSpecialization) => singleSpecialization.id !== id
        );
        setSpecialization(newSpecialization);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //===========================END DELETE DATA===============================================

  //===========================START Update DATA=============================================
  const handleUpdateSpecialization = (id) => {
    const updatedData = {
      name_specialization: nameSpecialization,
      image_specialization: imageSpecialization,
    };
    axios
      .put(`http://localhost:5000/specialization/${id}`, updatedData)
      .then((result) => {
        console.log(result.data);
        // Refresh data after successful update
        axios
          .get(`http://localhost:5000/specialization/`)
          .then((response) => {
            setSpecialization(response.data.result);
          })
          .catch((error) => {
            console.error("Error fetching specialization:", error);
          });
        // Reset update state and data
        setNameSpecialization("");
        setImageSpecialization("");
        setUpdateSpecializationId(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEdit = (id, name, image) => {
    // Set the ID of the specialization to be updated
    setUpdateSpecializationId(id);
    // Set the initial values for the inputs
    setNameSpecialization(name);
    setImageSpecialization(image);
  };
  const handleCancelEdit = () => {
    // Reset update state and data
    setUpdateSpecializationId(null);
    setNameSpecialization("");
    setImageSpecialization("");
  };

  //============================END Update DATA===============================================

  //=========================================================================================
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* -----------------------------Sidebar---------------------------- */}
          <div className="col-md-2 bg-light d-none d-md-block sidebar">
            <div
              className="left-sidebar"
              style={{
                position: "sticky",
                top: "0px",
              }}
            >
              <ul className="nav flex-column sidebar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="#clinics">
                    <svg
                      className="bi bi-chevron-right"
                      width={16}
                      height={16}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Clinics
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#users">
                    <svg
                      className="bi bi-chevron-right"
                      width={16}
                      height={16}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Specialization">
                    <svg
                      className="bi bi-chevron-right"
                      width={16}
                      height={16}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Specialization
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <h3 id="clinics">Clinics</h3>
            <hr />
            {/*---------------------------CLINICS TABLE----------------------- */}
            <div className="table-responsive">
              <table className="table table-dark-custom">
                <thead>
                  <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">Clinic_Name</th>
                    <th scope="col">Doctor_Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Specialization</th>
                    {/* <th scope="col">Update</th> */}
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {clinics.length &&
                    clinics.map((oneClinic, index) => {
                      return (
                        <tr key={oneClinic.id}>
                          {/* <th scope="row"></th> */}
                          <td>{oneClinic.name}</td>
                          <td>{oneClinic.doctor_name}</td>
                          <td>{oneClinic.location}</td>
                          <td>{oneClinic.specialization_name}</td>
                          {/* <td>
                            <button
                              style={{
                                padding: "3px",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "rgb(23, 135, 224)",
                                color: "white",
                              }}
                            >
                              Update
                            </button>
                          </td> */}
                          <td>
                            <button
                              style={{
                                padding: "3px",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "red",
                                color: "white",
                              }}
                              onClick={() => handleDeleteClinic(oneClinic.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <h3 id="users">Users</h3>
            <hr />
            {/*---------------------------USERS TABLE----------------------- */}
            <div className="table-responsive">
              <table className="table table-dark-custom">
                <thead>
                  <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">User_Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone_Number</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 &&
                    users.map((oneUser, index) => {
                      return (
                        <tr key={oneUser.id}>
                          {/* <th scope="row"></th> */}
                          <td>{oneUser.full_name}</td>
                          <td>{oneUser.age}</td>
                          <td>{oneUser.email}</td>
                          <td>{oneUser.phone_number}</td>
                          <td>{oneUser.gender}</td>
                          <td>
                            <button
                              style={{
                                padding: "3px",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "red",
                                color: "white",
                              }}
                              onClick={() => handleDeleteUser(oneUser.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <h3 id="Specialization">Specialization</h3>
            <hr />
            {/*------------------------SPECIALIZATION TABLE-----------------*/}
            <div className="table-responsive">
              <table className="table table-dark-custom">
                <thead>
                  <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">Specialization_Name</th>
                    <th scope="col">Specialization_Image</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {specialization.map((specialization) => (
                    <tr key={specialization.id}>
                      <td>
                        {updateSpecializationId === specialization.id ? (
                          <input
                            type="text"
                            value={nameSpecialization}
                            onChange={(e) =>
                              setNameSpecialization(e.target.value)
                            }
                          />
                        ) : (
                          specialization.name_specialization
                        )}
                      </td>
                      <td>
                        {updateSpecializationId === specialization.id ? (
                          <input
                            type="text"
                            value={imageSpecialization}
                            onChange={(e) =>
                              setImageSpecialization(e.target.value)
                            }
                          />
                        ) : (
                          specialization.image_specialization
                        )}
                      </td>
                      <td>
                        {updateSpecializationId === specialization.id ? (
                          <>
                            <button
                              style={{
                                padding: "3px",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "rgb(23, 135, 224)",
                                color: "white",
                              }}
                              onClick={() =>
                                handleUpdateSpecialization(specialization.id)
                              }
                            >
                              Save
                            </button>
                            <button
                              style={{
                                padding: "3px",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "rgb(23, 135, 224)",
                                color: "white",
                              }}
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            style={{
                              padding: "3px",
                              border: "none",
                              borderRadius: "5px",
                              backgroundColor: "rgb(23, 135, 224)",
                              color: "white",
                            }}
                            onClick={() =>
                              handleEdit(
                                specialization.id,
                                specialization.name_specialization,
                                specialization.image_specialization
                              )
                            }
                          >
                            Update
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          style={{
                            padding: "3px",
                            border: "none",
                            borderRadius: "5px",
                            backgroundColor: "red",
                            color: "white",
                          }}
                          onClick={() =>
                            handleDeleteSpecialization(specialization.id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      <br />
      <ScrollToTop smooth />
    </>
  );
}
