const express = require("express");
const cors = require('cors'); // Import cors
const app = express();
require('dotenv').config()
const mongoose = require("mongoose");

// this is used if the backend and front end is use different port make safe
app.use(cors()); 
const dbconfig = require("./config/dbconfig");
const port = process.env.PORT || 5000;
app.use(express.json()); 

// this is used for gate usersModel
const usersRoute = require("./routes/usersRoute");
// ////////////////////////////////
// ////////////////////////////////
// this is used for gate house Model 
const houseRoute = require("./routes/houseRoute");

// this is used for gate transaction Model
const transactionRoute = require("./routes/transactionRoute");

// this is used for booking Model
const bookingRoute = require("./routes/bookingroute");

// this is used for withdraw Model
const withdrawalRoute = require("./routes/withdrawalRoute");

// this is used for api
    app.use("/api/users",usersRoute);
app.use("/api/property",houseRoute);
app.use("/api/transaction",transactionRoute);
app.use("/api/bookRoom",bookingRoute);
app.use("/api/withdrawal",withdrawalRoute);


// this is used fo run server
app.listen(port,()=>{console.log(`listen on port ${port}` )})