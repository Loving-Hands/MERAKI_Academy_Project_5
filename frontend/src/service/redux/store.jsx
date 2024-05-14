import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/auth/authSlice.jsx";
import allClinicReducer from "../redux/reducers/clinics/clinicSlice.jsx";
import clinicSpecializatioReducer from "../redux/reducers/specialization/clinicSpecialization.jsx";

export default configureStore({
  reducer: {
    auth: authReducer,
    clinic: allClinicReducer,
    clinicSpecialization: clinicSpecializatioReducer,
  },
});
