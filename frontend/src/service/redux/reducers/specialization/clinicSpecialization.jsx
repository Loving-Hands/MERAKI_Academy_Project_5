import { createSlice } from "@reduxjs/toolkit";

export const clinicSlice=createSlice({
    name:"spatlization",
    initialState:{
        spatlization :[]
    },
    reducers:{
        setSpatlization:(state,action)=>{
            state.spatlization=action.payload
        },
        

    }
})

export const {setSpatlization}=clinicSlice.actions
export default clinicSlice.reducer
