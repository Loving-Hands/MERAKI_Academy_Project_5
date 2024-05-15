import { createSlice } from "@reduxjs/toolkit";
export const doc = createSlice ({
    name : "doc" ,
    initialState : {
        token : localStorage.getItem("token") || "",
        doctorId : localStorage.getItem("userId") || "",
        isLoggedIn :localStorage.getItem("token")? true : false,
        },
     reducers :{
        setLogin : (state , action) => {
            console.log(action.payload);
            state.token = action.payload,
            localStorage.setItem("token",action.payload),
            state.isLoggedIn = true
          
        },
        setDoctorId : ( state ,action) => {
            state.doctorId = action.payload,
            localStorage.setItem("doctorId",action.payload)
        },
        
        setLogout : (state ,action) => {
            state.token = null,
            state.doctorId = null,
            state.isLoggedIn = false,
            localStorage.clear();
        },
     }
})

export const {setLogin ,setDoctorId ,setLogout} = doc.actions;

export default doc.reducer