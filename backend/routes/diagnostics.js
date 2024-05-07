const express=require('express')
const routerDignostics=express.Router();

const {createDiginstoics,getAllDiagnosticsWithDoctorNames}=require('../controllers/diagnostics')
const authentication=require('../middleware/authentication')

routerDignostics.post('/create',createDiginstoics)
routerDignostics.get('/',authentication,getAllDiagnosticsWithDoctorNames)
module.exports=routerDignostics