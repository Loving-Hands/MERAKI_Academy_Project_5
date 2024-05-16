import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/regester";
import ContactUs from "../pages/contactUs";
import Clinics from "../pages/clinics";
import InfoClinic from "../pages/infoClinic.jsx";
import Specialization from "../pages/specialization";

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
    ],
  },
]);
