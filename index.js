require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/dbConnection')
const { registrationController, loginController, logoutController } = require('./controllers/authController')
const {profileCreateController, getProfile, getSingleProfile, updateProfile, holdProfile} = require('./controllers/profileCreateController')
const app = express()
app.use(express.json())
dbConnection()
// app.get('/',(req,res)=>{
//     res.send("Done")
// })
app.post('/registration',registrationController)
app.post('/login',loginController)
app.post('/logout',logoutController)
//Profile Create
app.post('/profileCreate', profileCreateController)
app.post('/updateProfile/:id',updateProfile)
app.post('/holdProfile',holdProfile)
app.get('/getProfile', getProfile)
app.get('/getProfile/:id', getSingleProfile)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`);
})
