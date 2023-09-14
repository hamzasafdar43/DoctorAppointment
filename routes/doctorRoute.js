const express = require("express");
const router = express.Router();
const authMiddlware = require("../middleware/authMiddlware");
const {
  getdoctorInfoController,
  updateddoctorInfoController,
  getdoctorByIdController,
  getdoctorappointmentController,
  updatestatusController,
  deldocappointmentController

} = require("../controller/doctorCtrl");

// Get doctor profile || method ||post
router.post("/getDoctorInfo", authMiddlware, getdoctorInfoController);
// update doctor profile || method ||post
router.post("/updateDoctorInfo", authMiddlware, updateddoctorInfoController);
// update doctor profile || method ||post
router.post("/getdoctorById", authMiddlware, getdoctorByIdController);
// get all doctor appointments  || method ||post
router.get(
  "/getdoctor-appointments",
  authMiddlware,
  getdoctorappointmentController
);
// update status of doctorappointments  || method ||post
router.post("/doctorgetappoint", authMiddlware, updatestatusController);


// update status of doctorappointments  || method ||post
router.post("/deldoc-appointments", authMiddlware, deldocappointmentController)
module.exports = router;
