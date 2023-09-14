const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        require:[true ,'first name is required']
    },
    lastname:{
        type:String,
        require:[true ,'last name is required']
    },
    phone:{
        type:String,
        require:[true ,'phone is required']
    },
    email:{
        type:String,
        require:[true ,'email is required']
    },
    website:{
        type:String,
      
    },
    address:{
        type:String,
        require:[true ,'address is required']
    },
    specilization:{
        type:String,
        require:[true ,'specialization is required']
    },
   experience:{
        type:String,
        require:[true ,'experience is required']
    },
    feecunsaltation:{
        type:Number,
        require:[true ,'fee cunsalt is required']
    },
    status:{
        type:String,
       default:"pending"
    },
    timing:{
        type:Object,
        require:[true ,'time is required']
    },
}
,{timestamps:true}
)


const doctorModel = mongoose.model("doctor" , userSchema)
module.exports = doctorModel