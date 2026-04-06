const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const registrationController = async (req, res) => {
    const { username, email, password } = req.body
    //todo for next -> validation
    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exist!"
            })
        }
        // Method-1
        const hash = bcrypt.hashSync(password, 10);
        const createUser = new User({
            username: username,
            email: email,
            password: hash
        }).save()
        res.send({
            id: createUser._id,
            username: createUser.username,
            email: createUser.email
        })
 
    // bcrypt.hash(password, 10, function (err, hash) {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).json({
    //             success: false,
    //             message: "Server Error"
    //         })
    //     }

    // // Method-2
    //      const hash = await bcrypt.hash(password, 10)
    //       const createUser = await new User({
    //         username: username,
    //         email: email,
    //         password: hash
    //     }).save()

    //     res.send({
    //         id: createUser._id,
    //         username: createUser.username,
    //         email: createUser.email
    //     })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}
        // Method-3
    //     const hash = await new Promise((resolve, reject) => {
    //         bcrypt.hash(password, 10, (err, hash) => {
    //             if (err) reject(err)
    //             resolve(hash)
    //         })
    //     })
    //     const createUser = await new User({
    //         username: username,
    //         email: email,
    //         password: hash
    //     }).save()

    //     res.send({
    //         id: createUser._id,
    //         username: createUser.username,
    //         email: createUser.email
    //     })
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //         success: false,
    //         message: "Server Error"
    //     })
}
const loginController = async (req, res)=>{
    const {email, password} = req.body
     const existingUser = await User.findOne({ email: email })
      if(existingUser.isLogin){
            res.status(403).json({
           success: false,
           message: "Please Logout from another device" 
        })
        }
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Email not found"
            })
        }
       const pass =  bcrypt.compareSync(password, existingUser.password );
       if(pass){
        existingUser.isLogin = true
        existingUser.save()
        res.status(200).json({
           success: true,
           message: "Login Successfully Done" 
        })
       }else{
        res.status(401).json({
           success: false,
           message: "Invalid Credential" 
        })
       }
       
    }
const logoutController = async (req,res)=>{
    const {id} = req.body
     const existingUser = await User.findOne({ _id: id })
      if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credential"
            })
        }
        existingUser.isLogin = false
        existingUser.save()
        res.status(200).json({
           success: true,
           message: "Logout Successfully Done"
        })
}
module.exports = { registrationController, loginController, logoutController }