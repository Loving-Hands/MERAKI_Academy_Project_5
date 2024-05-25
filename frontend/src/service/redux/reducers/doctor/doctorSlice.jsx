import { createSlice } from "@reduxjs/toolkit";

export const doc = createSlice({
  name: "doc",
  initialState: {
    token: localStorage.getItem("token") || "",
    doctorId: localStorage.getItem("doctorId") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
    message: "",
    status: false,
    role: localStorage.getItem("role") || "",
    docName: localStorage.getItem("docName") || "",
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    setDoctorId: (state, action) => {
      state.doctorId = action.payload;
      localStorage.setItem("doctorId", action.payload);
    },
    setRoleId: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("roleId", action.payload);
    },
    setLogoutDoc: (state) => {
      state.token = ""; // Clear token on logout
      state.doctorId = ""; // Clear doctorId on logout
      state.isLoggedIn = false;
      state.docName = ""; // Clear docName on logout
      localStorage.removeItem("token");
      localStorage.removeItem("doctorId");
    },
    setDocName: (state, action) => {
      state.docName = action.payload;
      localStorage.setItem("docName", action.payload);
    },
  },
});

export const { setLogin, setDoctorId, setLogoutDoc, setRoleId, setDocName } = doc.actions;

export default doc.reducer;
