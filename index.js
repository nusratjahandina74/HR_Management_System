require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/dbConnection')
const { registrationController } = require('./controllers/authController')
const app = express()
app.use(express.json())
dbConnection()
// app.get('/',(req,res)=>{
//     res.send("Done")
// })
app.post('/registration',registrationController)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`);
})
