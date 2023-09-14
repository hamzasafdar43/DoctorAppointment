const express = require("express");
const {
  registerController,
  loginController,
  usergetController,
  applydoctorController,
  getnotificationController,
  deleteallnotificationController,
  getallDoctorController,
  bookappointmentController,
  checkavalibilityController,
  getallappointmentController
} = require("../controller/userCtrl");
const authMiddlware = require("../middleware/authMiddlware");
const router = express.Router();

// Register || method || post
router.post("/register", registerController);

// Login    || method || post
router.post("/login", loginController);

// Getuser    || method || post
router.post("/getuser", authMiddlware, usergetController);

// Apply-Doctor || method || post
router.post("/apply-doctor", authMiddlware, applydoctorController);

// Get-all-notification || method || post
router.post("/get-notification", authMiddlware, getnotificationController);

// Delete-all-notification || method || post
router.post("/delete-notification", authMiddlware, deleteallnotificationController);

// Delete-all-notification || method || post
router.get("/getallaproved-doctor", authMiddlware, getallDoctorController);

// Book-appoinment || method || post
router.post("/book-appointment", authMiddlware, bookappointmentController);

// check avlibility || method || post
router.post("/check-avalibility", authMiddlware, checkavalibilityController);

// Get all appointments || method || post
router.get("/get-appointments", authMiddlware, getallappointmentController);

module.exports = router;
