import { createSlice } from "@reduxjs/toolkit";

export const allClinicSlice = createSlice({
  name: "clinic",
  initialState: {
    allClinic: [],
  },
  reducers: {
    setAllClinic: (state, action) => {
      state.allClinic = action.payload;
    },
  },
});
export const { setAllClinic } = allClinicSlice.actions;
export default allClinicSlice.reducer;
