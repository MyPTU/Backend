const express = require("express");
const cors = require('cors');
const dbConnect = require("./config/dbConnect");

const app = express();
const bodyParser = require("body-parser");
const Authentication = require('./routes/Authentication');
const PlacesRoutes = require('./routes/PlacesRoutes');
const ReportRoutes = require('./routes/ReportRoutes');
const ReviewRoutes = require('./routes/ReviewRoutes');

dbConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next(); 
});

app.use(cors()); 

app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hey! This is your mypark server response!" });
});

app.use("/authentication", Authentication);

//app.use("/devices", DeviceRoutes);

app.use("/places", PlacesRoutes);

app.use("/reports", ReportRoutes);

app.use("/reviews", ReviewRoutes);


app.listen(3001, () => {

  console.log("Server is running on port 3001.");

});




