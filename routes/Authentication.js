const express = require('express');
const router = express.Router();

const verifyJWT = require('../validations/verifyJWT');

const controllers = require('../controllers/AuthController')

router.get("/", (req, res) => {
    res.json({ message: "Hello This Auth Path" });
});

router.post("/register", controllers.signup);

router.post("/login", controllers.signin);

router.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
});

router.get("/auth-endpoint", verifyJWT, (req, res) => {
    res.json({ message: "You are authorized to access me" });
});

module.exports = router;