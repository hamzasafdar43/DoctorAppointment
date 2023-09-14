const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const PORT = 5000
const router = require("./routes/userAuth")
const routes = require("./routes/adminRoute")
const route = require("./routes/doctorRoute")
const dotenv = require("dotenv")


//dotenv conig
dotenv.config();

// middleware 
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
    res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requsted-With , Content-Type ,Accept"
    );
    next()
});

app.use(cors())
app.use(express.json())

// connecting for mongo database
mongoose.connect("mongodb://127.0.0.1:27017/appointmentdb",{useNewUrlParser:true})
// checking for connecting in  database
mongoose.connection.once("open",()=>{
    console.log("database is connected")
})


// static file access 
app.use(express.static(path.join(__dirname, "./frontened/build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontened/build/index.html"));
  });

// Routes || users
app.use("/" , router)
app.use("/" , routes)
app.use("/" , route)
// port || 5000
app.listen(PORT , ()=>{
    console.log("port is connected")
})