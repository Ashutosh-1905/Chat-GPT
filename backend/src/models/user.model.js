const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username must be required."],
        unique:[true,"User name must be unique."]
    },
     email: {
        type: String,
        required: [true,"email must be required."],
        unique: [true,"email must be unique."]
    },
    password: {
        type: String,
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, "First name is required."]
        },
        lastName: {
            type: String,
            required:[true, "Last name is required."]
        },
    },
    role: {
        type: String,
        enum: [ "user", "plus" ],
        default: "user"
    }
},{timestamps:true});

module.exports = mongoose.model("user", userSchema);