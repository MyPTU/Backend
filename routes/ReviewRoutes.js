const express = require('express');
const router = express.Router();
const Review = require('../controllers/ReviewController');

router.get("/", (req, res) => {
    res.json({ message: "Hello This Review Path" });
});

router.get("/all", Review.findAll);

router.post("/create", Review.create);

router.get("/:id",Review.findById);

module.exports = router;