import {createBrowserRouter} from  "react-router-dom"
import Main from "../layouts/Main"
import Home from "../pages/home"
import Login from "../pages/login"
import Regester from "../pages/regester"
import ContactUs from "../pages/contactUs"
import Clinics from "../pages/clinics"




export const router =createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children :[
            {
                path:"",
                element : <Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"regester",
                element:<Regester/>
            },
            {
                path:"contactus",
                element:<ContactUs/>
            },
            {
                path:"allClinics",
                element:<Clinics/>
            },
        ]
    }
])