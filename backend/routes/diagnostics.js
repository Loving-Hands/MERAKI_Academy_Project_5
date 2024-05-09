const express=require('express')
const routerDignostics=express.Router();

const {createDiginstoics,getAllDiagnosticsWithDoctorNames,sendDiagnosticToUser}=require('../controllers/diagnostics')
const authentication=require('../middleware/authentication')

routerDignostics.post('/create/:clinicId/:userId',authentication,createDiginstoics)
routerDignostics.get('/',authentication,getAllDiagnosticsWithDoctorNames)
//routerDignostics.post('/send/:clinicId',authentication,sendDiagnosticToUser)

module.exports=routerDignostics