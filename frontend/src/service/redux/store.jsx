import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/auth/authSlice.jsx";
// import clincReducer from "../redux/reducers/clinics/clinicSlice.jsx";
import clinicSpecializatioReducer from "../redux/reducers/specialization/clinicSpecialization.jsx";
import clinicSptlizationByReducer from "./reducers/specialization/clinicSptlizationById.jsx";

export default configureStore({
  reducer: {
    auth: authReducer, // Add your auth reducer here
    // clinic: clincReducer, // Add other reducers as needed
    clinicSpecialization: clinicSpecializatioReducer,
    clinicSptlizationById:clinicSptlizationByReducer
  },
});
