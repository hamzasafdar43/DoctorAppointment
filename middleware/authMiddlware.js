const jwt = require("jsonwebtoken")


const authMiddlware = async(req , res , next)=>{
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token,process.env.JWT_SECERT , (err,decode)=>{
            if(err){
              return  res.status(200).send({
                    success:false,
                    message:"Authorization faild",

                })
            }else{
                req.body.userId = decode.id
                next()
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"auth faild",
            error
        })
    }
}


module.exports = authMiddlware