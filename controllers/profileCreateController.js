const Profile = require('../models/profileCreateModel')
const profileCreateController = async (req, res) => {
    const { email, name, designation, phoneNumber, bloodGroup, gender, dob } = req.body
    const firstThreeLetter = name.slice(0,3)
    const randomNumber = Date.now().toString()
    const employeeID = firstThreeLetter + randomNumber.slice(-3)
    const checkID = await Profile.findOne({ employeeID: employeeID })
        if (checkID) {
            return res.status(409).json({
                success: false,
                message: "This EmployeeID already exist!"
            })
        }
    try {
        const existingProfile = await Profile.findOne({ email: email })
        if (existingProfile) {
            return res.status(409).json({
                success: false,
                message: "Email already exist!"
            })
        }
        const profile = new Profile({
            employeeID,
            email,
            name,
            designation,
            phoneNumber,
            bloodGroup,
            gender,
            dob
        })
        profile.save()
        res.status(201).json({
            success: true,
            message: "Profile Created"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}
const getProfile = async (req, res)=>{
  const data = await Profile.find({})
  res.status(200).json({
    success: true,
    message: "All Profile",
    data: data
  })
}
    module.exports = {profileCreateController, getProfile}
