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
    docName: "",
  },
  reducers: {
    setLogin: (state, action) => {
      console.log(action.payload);
      (state.token = action.payload),
        localStorage.setItem("token", action.payload),
        (state.isLoggedIn = true);
    },
    setDoctorId: (state, action) => {
      (state.doctorId = action.payload),
        localStorage.setItem("doctorId", action.payload);
    },
    setRoleId: (state, action) => {
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

export const { setLogin, setDoctorId, setLogoutDoc, setRoleId, setDocName } =
  doc.actions;

export default doc.reducer;
