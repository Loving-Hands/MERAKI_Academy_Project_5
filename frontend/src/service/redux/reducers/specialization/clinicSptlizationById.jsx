import { createSlice } from "@reduxjs/toolkit";

export const clinicSlice=createSlice({
    name:"spatlizationId",
    initialState:{
        spatlizationi :[]
    },
    reducers:{
        setSpatlizationById:(state,action)=>{
            state.spatlizationi=action.payload
        }

    }
})

export const {setSpatlizationById}=clinicSlice.actions
export default clinicSlice.reducer
