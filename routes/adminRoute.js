const express = require("express")
const router = express.Router()
const authMiddlware = require("../middleware/authMiddlware");
const { getuserController , getdoctorController ,changeAccountStatusControlle } = require("../controller/adminCtrl");

// Get all users || post
router.post("/get-all-user" , authMiddlware,getuserController)
// Get all doctor || post
router.get("/getDoctor" , authMiddlware,getdoctorController)
// changeAccountStatusController || post
router.post("/changeStatus" , authMiddlware,changeAccountStatusControlle)



module.exports = router