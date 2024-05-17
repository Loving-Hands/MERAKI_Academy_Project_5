import { createSlice } from "@reduxjs/toolkit";
import clinics from "../../../../pages/clinics";

export const clinicSlice=createSlice({
    name:"spatlizationId",
    initialState:{
        spatlizationi :[],
        filteredClinics: [],
        search:"",
        clinics: []
    },
    reducers:{
        setSpatlizationById:(state,action)=>{
            state.spatlizationi=action.payload
        },


    }
})

export const {setSpatlizationById,setClinics, setSearch}=clinicSlice.actions
export default clinicSlice.reducer
