require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/dbConnection')
const { registrationController, loginController, logoutController } = require('./controllers/authController')
const {profileCreateController, getProfile} = require('./controllers/profileCreateController')
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
app.get('/getProfile', getProfile)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`);
})
