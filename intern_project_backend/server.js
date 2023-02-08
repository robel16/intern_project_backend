const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routesurl = require("./Routes/Routes");
//app config

const app = express();
var PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");

//middleware
app.use(express.json());
app.use(cors());
app.use("/api/routes", routesurl);

//db config
dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_URL, () => console.log("connected to database"));


 


//listener
app.listen(PORT, (err=>{
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
}))
// export const userLogin = async (userCredentials) => {
//   const response = await fetch("url", {
//     method: "GET",
//     body: JSON.stringify(userCredentials),
//   })
//     .then((response) => response.json)
//     .catch((err) => console.log("Error occured", err.message));
//   return response;
// };

