const mongoose = require("mongoose");
//require mongoose 
const UserSchema = new mongoose.Schema({
    //Define Type Data is String and Field Name is email
    username: {
        type: String,
        required: [true, "Please provide an username"],
        unique: [true, "Email Exist"],
    },

    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },

    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

//define UserSchema Variable