const userModel = require("../models/userModel");
const usetModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentSchema");
const moment = require("moment")

// Register  || callback
const registerController = async (req, res) => {
  try {
    const user = await usetModel.findOne({ email: req.body.email });
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    if (user) {
      res.status(200).send({
        success: false,
        message: "user already exist",
      });
    } else {
      await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
      });
      res.status(200).send({
        success: true,
        message: "user successfully registered",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "registration error",
      error,
    });
  }
};

// Login controller
const loginController = async (req, res) => {
  try {
    const users = await userModel.findOne({ email: req.body.email });
    if (!users) {
      res.status(200).send({
        success: false,
        message: "user not found",
      });
    }

    const { password } = req.body;
    const compass = await bcrypt.compare(password, users.password);
    if (!compass) {
      res.status(200).send({
        success: false,
        message: "correct email and password",
      });
    }
    const token = await jwt.sign({ id: users._id }, process.env.JWT_SECERT, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "user successfully login",
      success: true,
      token,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "while error in login controller",
      error,
    });
  }
};

// getuserDetails || callback || function ..............
const usergetController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      res.status(200).send({
        message: "user are not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "get user faild",
      success: false,
      error,
    });
  }
};

//  applydoctorController || callback || function ....

const applydoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, stauts: "pending" });
    await newDoctor.save();
    const newAdmin = await userModel.findOne({ isAdmin: true });
    const notification = newAdmin.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} Has been applied Doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstname + newDoctor.lastname,
        onClickPath: "/apply/doctor",
      },
    });
    await userModel.findByIdAndUpdate(newAdmin._id, { notification });
    res.status(200).send({
      message: "apply doctor successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "apply-doctor faild",
      error,
    });
  }
};

// getnotificationController || callback || function ...
const getnotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    const  seennotification = user. seennotification
    const notification = user.notification
    seennotification.push(...notification)
    user.notification = []
    user.seennotification =  notification
    const UpdatedUser = await user.save()
    res.status(200).send({
        success:true,
        message:"all notification read successfully",
        data:UpdatedUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "get all notification faild",
      error,
    });
  }
};

// Delete all notification || callback || function...
const deleteallnotificationController = async(req,res)=>{
  try {
    const user = await userModel.findOne({_id :req.body.userId})
    user.notification = []
    user.seennotification = []
    const UpdatedUser = await user.save()
    UpdatedUser.password = undefined
    res.status(201).send({
      success:true,
      message:"Delete all notification successfully",
      data:UpdatedUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "delete all notification faild",
      error,
    });
  }
}
// Get all Doctor || callback || function ....
const getallDoctorController = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({status :"approved"})
    res.status(200).send({
      success:true,
      message:"get all doctor successful",
      data:doctors
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "get all  doctor faild",
      error,
    });
  }
}

//   bookappointmentController || callback || function ...
const  bookappointmentController = async(req,res) =>{
  try {
    req.body.status = "pending"
    req.body.date =  moment(req.body.date,"DD-MM-YYYY").toISOString()
    req.body.time =  moment(req.body.time,"HH-mm").toISOString()
    const newappointment = new appointmentModel(req.body)
    await newappointment.save()
    const user = await userModel.findOne({isDoctor:true})
    const notification = user.notification
    notification.push({
      type:"book-appointment-request",
      message:`A new appointment request ${req.body.userInfo.name}`,
      onClickPath:"/appointments"
    })
    await user.save()
    res.status(200).send({
      success:true,
      message:"Book Appointments Successfully"
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "book appointment faild",
      error,
    });
  }
}

// checkavalibilityController fun ...............

const checkavalibilityController = async(req,res) =>{
  try {
    const date = moment(req.body.date ,'DD-MM-YYYY').toISOString()
    const fromTime = moment(req.body.time ,'HH-mm').subtract(1 , "hours").toISOString()
    const toTime = moment(req.body.time ,'HH-mm').add(1 , "hours").toISOString()
    const doctorId = req.body.doctorId
    const appointments = await appointmentModel.find({doctorId ,date , time:{
      $gte:fromTime ,$lte:toTime
    }})
    if(appointments.length > 0){
      return res.status(200).send({
        success:true,
        message:"appointments not avalible at this time"
      })
    }else{
      return res.status(200).send({
        success:true,
        message:"Appointments Avaliable"
      })
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "check avalibility faild",
      error,
    }); 
  }
}

// Get all appointments func .............
const getallappointmentController = async(req , res) =>{
  try {
    const appointments = await appointmentModel.find({userId:req.body.userId})
    res.status(200).send({
      success:true,
      message:"Get all appointments successfully",
      data:appointments
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Get all appointments faild",
      error,
    }); 
  }
}
module.exports = {
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
};
