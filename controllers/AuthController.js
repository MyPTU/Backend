const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/UserModel');

exports.signup = async (req, res) => {
    const takenUsername = await User.findOne({username:User.username})
    const takenEmail = await User.findOne({email:User.email})
    if(takenUsername || takenEmail){
        res.json({
            message:"Username or email has already been taken"
        })
    }else{
        bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            // create a new user instance and collect the data
            const user = new User({
                username : req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });
            // save the new user
            user.save().then((result) => {
                res.status(201).send({
                    message: "User Created Successfully",
                    result,
                });
            }).catch((error) => {
                res.status(500).send({
                    message: "Error creating user",
                    error,
                });
            });
        }).catch((e) => {
            res.status(500).send({
                message: "Password was not hashed successfully",
                e,
            });
        });
    }
    
}

exports.signin = async (req,res) =>{
    User.findOne({ email: req.body.email })
        // if email exists
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt
                .compare(req.body.password, user.password)

                // if the passwords match
                .then((passwordCheck) => {

                    // check if password matches
                    if (!passwordCheck) {
                        return res.status(400).send({
                            message: "Passwords does not match",
                            error,
                        });
                    }

                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );

                    //   return success response
                    res.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })
                // catch error if password do not match
                .catch((error) => {
                    res.status(400).send({
                        message: "Passwords does not match",
                        error,
                    });
                });
        })
        // catch error if email does not exist
        .catch((e) => {
            res.status(404).send({
                message: "Email not found",
                e,
            });
        });
}