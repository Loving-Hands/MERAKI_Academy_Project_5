import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/auth/authSlice.jsx";
import allClinicReducer from "../redux/reducers/clinics/clinicSlice.jsx";
import clinicSpecializationReducer from "../redux/reducers/specialization/clinicSpecialization.jsx";
import doctorSlice from "../redux/reducers/doctor/doctorSlice.jsx";
import clinicSptlizationByIdReducer from "../redux/reducers/specialization/clinicSptlizationById.jsx";

export default configureStore({
  reducer: {
    auth: authReducer,
    clinic: allClinicReducer,
    clinicSpecialization: clinicSpecializationReducer,
    doc: doctorSlice,
    clinicSptlizationById: clinicSptlizationByIdReducer
  },
});