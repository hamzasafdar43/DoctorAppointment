const appointmentModel = require("../models/appointmentSchema");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel")

const getdoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      messsage: "get doctor Info successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messsage: "get profile faild",
      error,
    });
  }
};

// doctorData updated ||callback||function.....
const updateddoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      messsage: "update doctor Info successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messsage: "update doctorInfo faild",
      error,
    });
  }
};

// Get approved doctor by id .....
const getdoctorByIdController = async (req, res) => {
  try {
    const doctors = await doctorModel.findOne({ doctorId: req.body._id });
    res.status(200).send({
      success: true,
      messsage: "getdoctorById successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messsage: "getdoctor byid faild",
      error,
    });
  }
};

const getdoctorappointmentController = async (req, res) => {
    try {
      
        const appointments = await appointmentModel.find({
          doctorId: req.body.doctorId,
        });
        res.status(200).send({
          success: true,
          message: "Doctor Appointments fetch Successfully",
          data: appointments,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Doc Appointments",
        });
      }
};
// updatestatusController func.........
 const updatestatusController = async(req,res) =>{
    try {
        const { appointmentsId, status } = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate(
          appointmentsId,
          { status }
        );
        const user = await userModel.findOne({ isUser:true });
        const notification = user.notification;
        notification.push({
          type: "status-updated",
          message: `your appointment has been updated ${status}`,
          onCLickPath: "/doctor-appointments",
        });
        await user.save();
        res.status(200).send({
          success: true,
          message: "Appointment Status Updated",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error In Update Status",
        });
      }
 }
//  Delete doctor appoinments ....
const deldocappointmentController = async(req,res)=>{
  try {
    await appointmentModel.findOneAndDelete({_id:req.body.doctorId})
    res.status(200).send({
        success:true,
        message:"Delete appointments successfully"
    })
} catch (error) {
   console.log(error) 
   res.status(500).json(error)
}
}
module.exports = {
  getdoctorInfoController,
  updateddoctorInfoController,
  getdoctorByIdController,
  getdoctorappointmentController,
  updatestatusController,
  deldocappointmentController
};
