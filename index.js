require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/dbConnection')
const app = express()
app.use(express.json())
dbConnection()
app.get('/',(req,res)=>{
    res.send("Done")
})
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`);
})
