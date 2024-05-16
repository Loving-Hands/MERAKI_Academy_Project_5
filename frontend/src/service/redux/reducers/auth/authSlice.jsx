import { createSlice } from "@reduxjs/toolkit";
export const auth = createSlice ({
    name : "auth" ,
    initialState : {
        token : localStorage.getItem("token") || "",
        userId : localStorage.getItem("userId") || "",
        isLoggedIn :localStorage.getItem("token")? true : false,
        message: '',
        status: false,
        role : localStorage.getItem("role") || "",
        },
     reducers :{
        setLogin : (state , action) => {
            console.log(action);
            state.token = action.payload,
            state.role = action.payload,
            localStorage.setItem("token",action.payload),
            localStorage.setItem("role",action.payload),
            state.isLoggedIn = true
            
        },
        setUserId : ( state ,action) => {
            state.userId = action.payload,
            localStorage.setItem("userId",action.payload)
        },
        
        setLogout : (state ,action) => {
            state.token = null,
            state.userId = null,
            state.isLoggedIn = false,
            localStorage.clear();
        },
     }
})

export const {setLogin ,setUserId ,setLogout} = auth.actions;

export default auth.reducer