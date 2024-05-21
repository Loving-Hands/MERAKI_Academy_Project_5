import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/regester.jsx";
import ContactUs from "../pages/contactUs";
import Clinics from "../pages/clinics";
import InfoClinic from "../pages/infoClinic.jsx";
import Specialization from "../pages/specialization";
import LoginDoc from "../pages/doctorLogin";
import RegisterDoc from "../pages/doctorRegister";
import RegisterAppointmentClinic from "../pages/registerAppointmentClinic.jsx";
import InformationUsers from "../pages/informationUsers.jsx";
import AppointmentInfo from "../pages/appointment.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "allClinics",
        element: <Clinics />,
      },
      {
        path: "infoClinic/:id",
        element: <InfoClinic />,
      },
      {
        path: "specialization/:id",
        element: <Specialization />,
      },
      {
        path: "loginDoc",
        element: <LoginDoc />,
      },
      {
        path: "registerDoc",
        element: <RegisterDoc />,
      },
      {
        path: "appointment/:id",
        element: <RegisterAppointmentClinic />,
      },
      {
        path: "user/:id",
        element: <InformationUsers />,
      },
      {
        path: "appointment/user/:userId",
        element: <AppointmentInfo />,
      },
    ],
  },
]);
