require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
mongoose.connect(process.env.DB_URL,).then(()=>{
    console.log("Database Connected");
})
app.get('/',(req,res)=>{
    res.send("Done")
})
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`);
})
