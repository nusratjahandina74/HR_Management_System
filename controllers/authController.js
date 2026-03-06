const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const registrationController = async (req, res) => {
    const { username, email, password } = req.body
    //todo for next -> validation
    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exist!"
            })
        }
        // Method-1
        // bcrypt.hash(password, 10, function (err, hash) {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).json({
        //             success: false,
        //             message: "Server Error"
        //         })
        //     }
        //     const createUser = new User({
        //     username: username,
        //     email: email,
        //     password: hash
        // }).save()
        // res.send({
        //     id: createUser._id,
        //     username: createUser.username,
        //     email: createUser.email
        // })
        // });
        // Method-2
             const hash = await bcrypt.hash(password, 10)
              const createUser = await new User({
                username: username,
                email: email,
                password: hash
            }).save()

            res.send({
                id: createUser._id,
                username: createUser.username,
                email: createUser.email
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Server Error"
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


module.exports = { registrationController }