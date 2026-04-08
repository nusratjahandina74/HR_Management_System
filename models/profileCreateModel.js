const mongoose = require('mongoose')
const {Schema} = mongoose
const profileSchema = new Schema({
employeeID:{
    type: String,
    require: true
},
email:{
    type: String,
    require: true,
    unique: true,
    trim: true
},
name:{
    type: String,
    require: true
},
designation:{
    type: String,
    require : true
},
phoneNumber:{
    type: String,
    require: true
},
bloodGroup:{
    type: String,
    enum: ["a+","a-","b+","b-","ab+","ab-","o+","o-","ob+","ob-"],
    require: true
},
gender:{
    type: String,
    enum: ["male","female", "custom"],
    require: true

},
dob : {
    type : String,
    require: true
},
isHold : {
    type : Boolean,
    default : false
}
})
module.exports = mongoose.model("Profile", profileSchema)