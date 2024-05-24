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
    username: localStorage.getItem("username"),

    docName: "",
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.isLoggedIn = true;
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
      state.token = "";
      state.doctorId = "";
      state.isLoggedIn = false;
      state.role = "";
      state.username = "";
      localStorage.clear();
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);

      (state.role = action.payload),
        localStorage.setItem("roleId", action.payload);
    },
    setLogoutDoc: (state, action) => {
      (state.token = null),
        (state.doctorId = null),
        (state.isLoggedIn = false),
        localStorage.clear();
    },
    setDocName: (state, action) => {
      state.docName = action.payload;
      localStorage.setItem("docName", action.payload);
    },
  },
});

export const { setLogin, setDoctorId, setLogoutDoc, setRoleId, setUsername } = doc.actions;


export default doc.reducer;
