import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    userId: localStorage.getItem("userId") || "",
    isLoggedIn: !!localStorage.getItem("token"),
    message: "",
    status: false,
    role: localStorage.getItem("role") || "",
    username: null
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setRoleId: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("roleId", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      state.role = null;
      localStorage.clear();
      state.username = null;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setLogin, setUserId, setRoleId, setLogout, setUsername } = auth.actions;

export default auth.reducer;
