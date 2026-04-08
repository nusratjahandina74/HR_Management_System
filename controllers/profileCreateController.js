const Profile = require('../models/profileCreateModel')
const profileCreateController = async (req, res) => {
    const { email, name, designation, phoneNumber, bloodGroup, gender, dob } = req.body
    const firstThreeLetter = name.slice(0, 3)
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
const getProfile = async (req, res) => {
    const data = await Profile.find({})
    res.status(200).json({
        success: true,
        message: "All Profile",
        data: data
    })
}
const getSingleProfile = async (req, res) => {
    const { id } = req.params
    const data = await Profile.findOne({ _id: id })
    res.status(200).json({
        success: true,
        message: `${data.name} Profile`,
        data: data
    })
}
const updateProfile = async (req, res) => {
    const { id } = req.params
    const data = await Profile.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    res.status(200).json({
        success: true,
        message: "Profile Update Sccessfully Done",
        data: data
    })
}
const holdProfile = async (req, res) => {
    const { id } = req.body
    try {
        const existingProfile = await Profile.findOne({ _id: id })
        if (!existingProfile) {
            return res.status(401).json({
                success: false,
                message: "Profile Not Found"
            })
        }
        existingProfile.isHold = true
        existingProfile.save()
        res.status(200).json({
            success: true,
            message: "Profile Hold"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}
module.exports = { profileCreateController, getProfile, getSingleProfile, updateProfile, holdProfile }
