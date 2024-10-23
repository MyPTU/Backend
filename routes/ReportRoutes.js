const express = require('express');
const router = express.Router();
const Report = require('../controllers/ReportController');
const verifyJWT = require('../validations/verifyJWT');

router.get("/", (req, res) => {
    res.json({ message: "Hello This Report Path" });
});
//Hello
router.get("/all",Report.findAll);
//Hello
router.post("/create", Report.create);
// for create newPlace to db
router.post("/:id",verifyJWT, Report.findByid);
// get all data
router.put("/:id",verifyJWT, Report.update);
//Get
module.exports = router;