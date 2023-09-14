const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true , 'name is required']
    },
    email:{
        type:String,
        require:[true , 'email is required']
    },
    password:{
        type:String,
        require:[true , 'password is required']
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isUser:{
        type:Boolean,
        default:true
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    }
})


const userModel = mongoose.model("user" , userSchema)
module.exports = userModel