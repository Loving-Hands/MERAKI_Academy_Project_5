
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

//=======================================================================
// const dispatch = useDispatch();
export default function admin() {

//================== CLINICS TABLE ======================================
const [clinics, setClinics] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/clinic/`)
        .then((result)=>{
            console.log(result.data);
            setClinics(result.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
//=====================================================================
//================== USERS TABLE ======================================
const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/`)
        .then((result)=>{
            console.log(result.data.result);
            setUsers(result.data.result)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
//=====================================================================
//================== SPECIALIZATION TABLE ======================================
const [specialization, setspecialization] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/specialization/`)
        .then((result)=>{
            console.log(result.data);
            setspecialization(result.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
//=====================================================================
    return (
        <>
          <div className="container-fluid">
            <div className="row">
              {/* Sidebar */}
              <div className="col-md-2 bg-light d-none d-md-block sidebar">
                <div className="left-sidebar">
                  <ul className="nav flex-column sidebar-nav">
                    <li className="nav-item">
                      <a className="nav-link active" href="#Invoice"> 
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
                      <a className="nav-link" href="#">
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
                      <a className="nav-link" href="#">
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
                <h3>Clinics</h3>
                <hr />
                <div className="table-responsive">
                  <table className="table table-dark">
                    <thead>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Clinic_Name</th>
                        <th scope="col">Doctor_Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Specialization</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                        {clinics.length &&clinics.map((oneClinic,index)=>{
                            return(
                            <tr key={oneClinic.id}>
                        {/* <th scope="row"></th> */}
                        <td>{oneClinic.name}</td>
                        <td>{oneClinic.doctor_name}</td>
                        <td>{oneClinic.location}</td>
                        <td>{oneClinic.specialization_name}</td>
                        <td>
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
                          >
                            Delete
                          </button>
                        </td>
                      </tr>)
                         })} 
                      
                    </tbody>
                  </table>
                </div>
                <h3>Users</h3>
                <hr />
                <div className="table-responsive">
                  <table className="table table-dark">
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
                        {users.length > 0 && users.map((oneUser,index)=>{
                            return(
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
                          >
                            Delete
                          </button>
                        </td>
                      </tr>)
                         })} 
                      
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
          <br />
        </>
      );
}

