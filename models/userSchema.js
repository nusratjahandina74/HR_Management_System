const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        unique: true
        // match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [5, "Too Low"],
        max: [8, "Too High"]
        // match: [
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        //     'Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.'
        // ]
    },
    photo: {
        type: String
    },
    nid: {
        type: Number,
        min: [10, "Too Low"],
        max: [17, "Too High"]
    },
    address: {
        type: String
    }
})
module.exports = mongoose.model("User", userSchema)