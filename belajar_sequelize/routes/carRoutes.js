const express = require("express");
const router = express.Router();
const CarsControl = require("./../controllers/carController");

router.get("/",CarsControl.getAllData);
// router.get("/filter/:type",getAllData).get(filterType);

module.exports=router;
