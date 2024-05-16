import { createSlice } from "@reduxjs/toolkit";
export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    userId: localStorage.getItem("userId") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
    message: "",
    status: false,
    role: localStorage.getItem("role") || "",
    username: null
  },
  reducers: {
    setLogin: (state, action) => {
      (state.token = action.payload),
        (state.role = action.payload),
        localStorage.setItem("token", action.payload),
        localStorage.setItem("role", action.payload),
        (state.isLoggedIn = true);
        state.username = action.payload.username;

    },
    setUserId: (state, action) => {
      (state.userId = action.payload),
        localStorage.setItem("userId", action.payload);
    },

    setLogout: (state, action) => {
      (state.token = null),
        (state.userId = null),
        (state.isLoggedIn = false),
        localStorage.clear();
        state.username = null;

    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    
  },
});

export const { setLogin, setUserId, setLogout,setUsername} = auth.actions;

export default auth.reducer;
