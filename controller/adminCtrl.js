const userModel = require("../models/userModel")
const doctorModel = require("../models/doctorModel")


// Get all users || callback || function...
const getuserController = async(req,res)=>{
    try {
        const users = await userModel.find({})
        res.status(200).send({
            successa:true,
            messagea:"get all user successfully",
            data:users
        })
    } catch (error) {
       console.log(error) 
       res.status(500).send({
        success:false,
        message:"get all user faild",
        error
       })
    }
}
// Get all doctors || callback || function...
const getdoctorController = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            successa:true,
            messagea:"get all doctor successfully",
            data:doctors
        })
    } catch (error) {
       console.log(error) 
       res.status(500).send({
        success:false,
        message:"get all doctor faild",
        error
       })
    }
}
// changeAccountStatusControlle ||callback||function...

const changeAccountStatusControlle = async(req,res)=>{
    try {
        const { doctorId, status } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
        const user = await userModel.findOne({ isDoctor: true });
        const notification = user.notification;
        notification.push({
          type: "doctor-account-request-updated",
          message: `Your Doctor Account Request Has ${status} `,
          onClickPath: "/notification",
        });
        user.isDoctor = status === "approved" ? true : false;
        await user.save();
        res.status(201).send({
          success: true,
          message: "Account Status Updated",
          data: doctor,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Eror in Account Status",
          error,
        });
      }
}
module.exports ={getuserController , getdoctorController , changeAccountStatusControlle}